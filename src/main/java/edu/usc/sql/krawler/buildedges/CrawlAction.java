package edu.usc.sql.krawler.buildedges;


import edu.usc.sql.krawler.buildgraphs.UIState;
import edu.usc.sql.krawler.utilities.Pair;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class CrawlAction {

    @Getter
    String subjectName;
    int hop = 0;

    @Getter @Setter
    UIState originStateOfCrawl;
    @Getter
    List<Pair<String, String>> crawlTrace;
//    KWALIElementWrapper element;
    @Getter
    String action;
    @Getter
    String elementXpath;

//    public CrawlAction(String subjectName, List<Pair<KWALIElementWrapper, String>> crawlTrace, KWALIElementWrapper element, String action) {
//        this.subjectName = subjectName;
//        this.crawlTrace = crawlTrace;
//        this.element = element;
//        this.action = action;
//    }

    public CrawlAction(String subjectName, int hop, List<Pair<String, String>> crawlTrace, String elementXpath, String action) {
        this.subjectName = subjectName;
        this.hop = hop;
        this.crawlTrace = crawlTrace;
        this.elementXpath = elementXpath;
        this.action = action;
    }

    @Override
    public String toString() {
        return "CrawlAction{" +
                "hop=" + hop +
                ", crawlTrace=" + crawlTrace +
                ", action='" + action + '\'' +
                ", elementXpath='" + elementXpath + '\'' +
                '}';
    }
}
