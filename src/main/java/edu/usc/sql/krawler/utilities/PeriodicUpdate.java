//package edu.usc.sql.krawler.utilities;
//
//import edu.usc.sql.krawler.buildgraphs.UIState;
//import edu.usc.sql.krawler.graphs.UIGraphEdge;
//import edu.usc.sql.krawler.graphs.UIGraphNode;
//import edu.usc.sql.krawler.graphs.UIGraphState;
//import edu.usc.sql.krawler.graphs.UIGraph;
//import edu.usc.sql.krawler.newKrawler.Results;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.util.HashSet;
//import java.util.Set;
//
//public class PeriodicUpdate {
//
//    int stateID;
//    @Getter @Setter
//    Set<UIGraphNode> nodesToAdd;
//    @Getter @Setter
//    Set<UIGraphEdge> edgesToAdd;
//
//
//    public PeriodicUpdate(int stateID) {
//
//        this.stateID = stateID;
//        nodesToAdd = new HashSet<>();
//        edgesToAdd = new HashSet<>();
//
//    }
//
//    public void addNode(String v_xpath) {
//
//        UIGraphNode v = new UIGraphNode(v_xpath);
//        nodesToAdd.add(v);
//
//    }
//
//    public void addEdge(String v_1_xpath, String phi, String v_2_xpath) {
//
//        UIGraphNode v_s = new UIGraphNode(v_1_xpath);
//        UIGraphNode v_t = new UIGraphNode(v_2_xpath);
//        UIGraphEdge e = new UIGraphEdge(v_s, v_t, phi);
//
//        edgesToAdd.add(e);
//
//    }
//
//    public void update() {
//
//
//        Set<UIGraphState> visitedState = Results.getExploredDOMStateSet_size();
//        for(UIGraphState ss : visitedState){
//            if(ss.getUniversalStateID() == stateID){
//                UIGraph uiGraph = ss.getUigraph();
//                uiGraph.getNodes().addAll(nodesToAdd);
//                uiGraph.getEdges().addAll(edgesToAdd);
//
//
//            }
//
//        }
//    }
//
//}
