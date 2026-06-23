package edu.usc.sql.krawler.buildgraphs;


import edu.usc.sql.krawler.interaction.KeyStrokeExecutor;
import edu.usc.sql.krawler.utilities.Utils;
import edu.usc.sql.krawler.utilities.Pair;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

public class CrawlTraceToState {


  public static void crawlToState(WebDriver refDriver, List<Pair<String, String>> crawlTrace) throws Exception {


      for (int i = 0; i < crawlTrace.size(); i++) {
        Pair<String, String> crawlAction = crawlTrace.get(i);            // action pair
        String v_sXpath = crawlAction.getLeft();                            // origin node of the action pair
        String phi = crawlAction.getRight();                                        // action (to perform on origin node) of the action pair
        WebElement v_s = refDriver.findElement(By.xpath(v_sXpath));                    // web element of origin node

//        // abandon thread when link's target=_blank
//        if (CrawlExceptions.isNotToExecuteAction(v_s, phi)) {
//          gs.shutdownWebDriver();
//          System.out.println("CrawlTraceToState: Thread Ended because target=_blank during crawl-trace");
//          coct.setInterrupedToTerminate(true);            // expected termination (not unexpected change-of-context)
//          return;        // recall that this jumps out of current method up to run(), where the while loop is
//        }

        KeyStrokeExecutor.sendKey(phi, v_s);                    // execute keystroke
        Utils.waitForResourceLoad(0.5);
      }

  }
}
