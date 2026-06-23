package edu.usc.sql.krawler.buildedges.intrastate;

import edu.usc.sql.krawler.utilities.Pair;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

public class CrawlActionNonMutationResult {

    @Getter @Setter
    String subjectName;
    @Getter @Setter
    int hop = 0;
    @Getter @Setter
    List<Pair<String, String>> crawlTrace;
    @Getter @Setter
    String elementXpath;
    @Getter @Setter
    String action;

    @Getter @Setter
    String resultingFocus;


    public CrawlActionNonMutationResult(String subjectName, List<Pair<String, String>> crawlTrace, String elementXpath, String action, String resultingFocus) {
        this.subjectName = subjectName;
        this.crawlTrace = crawlTrace;
        this.elementXpath = elementXpath;
        this.action = action;
        this.resultingFocus = resultingFocus;
    }

    @Override
    public String toString() {
        return "CrawlActionNonMutationResult{" +
                "hop=" + hop +
                ", crawlTrace=" + crawlTrace +
                ", elementXpath='" + elementXpath + '\'' +
                ", action='" + action + '\'' +
                ", resultingFocus='" + resultingFocus + '\'' +
                '}';
    }
}
