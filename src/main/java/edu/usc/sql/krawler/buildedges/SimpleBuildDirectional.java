package edu.usc.sql.krawler.buildedges;

import edu.usc.sql.krawler.buildgraphs.CrawlTraceToState;
import edu.usc.sql.krawler.graphs.UIGraphEdge;
import edu.usc.sql.krawler.graphs.UIGraphNode;
import edu.usc.sql.krawler.interaction.KeyStrokeExecutor;
import edu.usc.sql.krawler.utilities.Utils;
import edu.usc.sql.krawler.utilities.Pair;
import edu.usc.sql.krawler.webproxy.GetTestSubjects;

import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class SimpleBuildDirectional {

  String subjectName;
  List<Pair<String, String>> crawlTrace;
  String direction;
  int numberIterations;
  int proxyPort;

  List<String> navigationSequenceXpaths;
  Set<UIGraphNode> nodes;
  Set<UIGraphEdge> edges;

  public SimpleBuildDirectional(
          String subjectName,
          List<Pair<String, String>> crawlTrace,
          String direction,
          int numberIterations,
          int proxyPort
  ) {
    this.subjectName = subjectName;
    this.crawlTrace = crawlTrace;
    this.direction = direction;
    this.numberIterations = numberIterations;
    this.proxyPort = proxyPort;

    this.navigationSequenceXpaths = new ArrayList<>();
    this.nodes = new HashSet<>();
    this.edges = new HashSet<>();
  }

  public void process() {
    GetTestSubjects gs = null;

    try {
      gs = new GetTestSubjects(subjectName, proxyPort, false);

      WebDriver refDriver = gs.getRefDriver();

      Utils.waitForPageLoad(refDriver, 20);

      try {
        CrawlTraceToState.crawlToState(refDriver, crawlTrace);
      } catch (Exception e) {
        e.printStackTrace();
        return;
      }

      ((JavascriptExecutor) refDriver).executeScript("window.focus();");

      for (int i = 0; i < numberIterations; i++) {
        try {
          String current_element_focus_xpath =
                  Utils.getRealXpath(refDriver, refDriver.switchTo().activeElement());

          navigationSequenceXpaths.add(current_element_focus_xpath);

          if (direction.equals("TAB")) {
            KeyStrokeExecutor.pressTab(refDriver.switchTo().activeElement());
          } else if (direction.equals("SHIFTTAB")) {
            KeyStrokeExecutor.pressShiftTab(refDriver.switchTo().activeElement());
          }

        } catch (Exception e) {
          e.printStackTrace();
          return;
        }
      }

      constructNodesAndEdges();

    } finally {
      if (gs != null) {
        gs.shutdownWebDriver();
      }
    }
  }

  public void constructNodesAndEdges() {
    List<String> seenXpath = new ArrayList<>();

    for (int i = 0; i < navigationSequenceXpaths.size() - 1; i++) {
      String v_s_xpath = navigationSequenceXpaths.get(i);
      String v_t_xpath = navigationSequenceXpaths.get(i + 1);

      if (seenXpath.contains(v_s_xpath) && seenXpath.contains(v_t_xpath)) {
        if (seenXpath.indexOf(v_t_xpath) == seenXpath.indexOf(v_s_xpath) + 1) {
          break;
        }
      }

      UIGraphNode v_s = new UIGraphNode(v_s_xpath);
      UIGraphNode v_t = new UIGraphNode(v_t_xpath);

      UIGraphEdge e = new UIGraphEdge(v_s, v_t, direction);

      nodes.add(v_s);
      nodes.add(v_t);
      edges.add(e);

      seenXpath.add(v_s_xpath);
      seenXpath.add(v_t_xpath);
    }
  }
}