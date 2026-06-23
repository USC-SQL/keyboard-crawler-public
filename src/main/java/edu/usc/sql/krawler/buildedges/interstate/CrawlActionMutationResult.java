package edu.usc.sql.krawler.buildedges.interstate;

import edu.usc.sql.krawler.buildgraphs.UIState;
import edu.usc.sql.krawler.utilities.Pair;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

public class CrawlActionMutationResult {

    @Getter @Setter
    String subjectName;
    @Getter @Setter
    int hop = 0;
    @Getter @Setter
    UIState originStateOfCrawl;
    @Getter @Setter
    List<Pair<String, String>> crawlTrace;
    @Getter @Setter
    String elementXpath;
    @Getter @Setter
    String action;

    @Getter @Setter
    //Set<String> resultingState;
    UIState resultingState;


//    public CrawlActionMutationResult(String subjectName, List<Pair<String, String>> crawlTrace, String elementXpath, String action, Set<String> resultingState) {
//        this.subjectName = subjectName;
//        this.crawlTrace = crawlTrace;
//        this.elementXpath = elementXpath;
//        this.action = action;
//        this.resultingState = resultingState;
//    }

    public CrawlActionMutationResult(String subjectName, List<Pair<String, String>> crawlTrace, String elementXpath, String action, UIState resultingState) {
        this.subjectName = subjectName;
        this.crawlTrace = crawlTrace;
        this.elementXpath = elementXpath;
        this.action = action;
        this.resultingState = resultingState;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CrawlActionMutationResult that = (CrawlActionMutationResult) o;
        return resultingState.equals(that.resultingState);
    }

    @Override
    public int hashCode() {
        return Objects.hash(resultingState);
    }

    @Override
    public String toString() {
        return "CrawlActionMutationResult{" +
                "hop=" + hop +
                ", crawlTrace=" + crawlTrace +
                ", elementXpath='" + elementXpath + '\'' +
                ", action='" + action + '\'' +
                ", resultingState=" + resultingState +
                '}';
    }
}
