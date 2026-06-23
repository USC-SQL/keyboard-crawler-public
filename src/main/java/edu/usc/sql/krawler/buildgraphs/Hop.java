package edu.usc.sql.krawler.buildgraphs;

import edu.usc.sql.krawler.buildedges.interstate.CrawlActionMutationResult;
import edu.usc.sql.krawler.buildedges.CrawlAction;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

public class Hop {

    @Getter @Setter
    int hop;
    @Getter @Setter
    public Set<CrawlAction> hopCrawlAction;
    @Getter @Setter
    public Set<CrawlActionMutationResult> hopCrawlActionMutationResult;

    public Hop(int hop) {
        this.hop = hop;
        this.hopCrawlAction = new HashSet<>();
        this.hopCrawlActionMutationResult = new HashSet<>();
    }
}
