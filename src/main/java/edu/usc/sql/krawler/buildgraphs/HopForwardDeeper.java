package edu.usc.sql.krawler.buildgraphs;

import edu.usc.sql.krawler.buildedges.interstate.CrawlActionMutationResult;
import edu.usc.sql.krawler.buildedges.CrawlAction;
import edu.usc.sql.krawler.buildgraphs.Hop;
import edu.usc.sql.krawler.buildgraphs.UIState;
import edu.usc.sql.krawler.utilities.Pair;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class HopForwardDeeper {


    public static Hop process(Hop currentHop){

        Hop nextHop = new Hop(currentHop.getHop()+1);

        //Set<CrawlAction> hopCrawlAction = currentHop.getHopCrawlAction();
        Set<CrawlActionMutationResult> hopCrawlActionMutationResult = currentHop.getHopCrawlActionMutationResult();

        Set<CrawlAction> nextHopCrawlAction = new HashSet<>();

        for(CrawlActionMutationResult camr : hopCrawlActionMutationResult){
            String subjectName = camr.getSubjectName();
            int hop = camr.getHop();
            String action = camr.getAction();
            List<Pair<String, String>> crawlTrace = camr.getCrawlTrace();
            String elementXpath = camr.getElementXpath();


            List<Pair<String, String>> crawlTraceNew = new ArrayList<>();
            crawlTraceNew.addAll(crawlTrace);
            Pair<String, String> actionToCrawl = new Pair<>(elementXpath, action);
            crawlTraceNew.add(actionToCrawl);


            //Set<String> resultingState = camr.getResultingState();
            UIState resultingState = camr.getResultingState();
            for(String elementInResultingState : resultingState.getNodesXpaths()){

                CrawlAction ca = new CrawlAction(subjectName, hop, crawlTraceNew, elementInResultingState, "ENTER");
                ca.setOriginStateOfCrawl(camr.getResultingState());
                nextHopCrawlAction.add(ca);

            }

        }


        nextHop.setHopCrawlAction(nextHopCrawlAction);


        return nextHop;



    }

}
