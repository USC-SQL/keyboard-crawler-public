package edu.usc.sql.krawler.buildgraphs;

import edu.usc.sql.krawler.buildedges.CrawlAction;
import edu.usc.sql.krawler.buildedges.intrastate.utils.CrawlEdgeExceptions;
import edu.usc.sql.krawler.utilities.Pair;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class GetCrawlActionsForUIState {



    public static Set<CrawlAction> process(String subjectName, UIState state, Set<String> keysToCrawl){

        Set<CrawlAction> actionsToCrawl = new HashSet<>();

        Set<String> nodesXpaths = state.getNodesXpaths();

        for(String nodeXpath:nodesXpaths){
            for(String keyToCrawl:keysToCrawl){

                // crawl exception
                if(CrawlEdgeExceptions.isNotToCreateCrawlAction(nodeXpath, keyToCrawl)){
                    System.out.println(nodeXpath + " ayoo " + keyToCrawl);
                    //System.exit(0);
                    continue;
                }



                //List<Pair<String, String>> crawlTraceNew = new ArrayList<>();
                List<Pair<String, String>> crawlTraceToState = state.getCrawlTrace();
//                crawlTraceNew.addAll(crawlTraceToState);
//                Pair<String, String> actionToCrawl = new Pair<>(nodeXpath, keyToCrawl);
//                crawlTraceNew.add(actionToCrawl);

                CrawlAction ca = new CrawlAction(subjectName, -1, crawlTraceToState, nodeXpath, keyToCrawl);
                actionsToCrawl.add(ca);



            }


        }

        return actionsToCrawl;


    }


}
