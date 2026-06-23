package edu.usc.sql.krawler.io;


import edu.usc.sql.krawler.graphs.UIGraph;
import edu.usc.sql.krawler.graphs.UIGraphEdge;
import edu.usc.sql.krawler.graphs.UIGraphNode;
import edu.usc.sql.krawler.graphs.UIGraphState;
import edu.usc.sql.krawler.utilities.Pair;
import edu.usc.sql.krawler.utilities.WriteToFile;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;
import java.util.Set;

public class WriteUIGraphToJSON {

  String filePath;
  List<UIGraphState> uiGraphStateList;
  String uiGraphType;

  public WriteUIGraphToJSON(String filePath, List<UIGraphState> uiGraphStateList, String uiGraphType) {
    this.filePath = filePath;
    this.uiGraphStateList = uiGraphStateList;
    this.uiGraphType = uiGraphType;
  }

  public JSONArray prepareNodes(Set<UIGraphNode> uiGraphNodes) {
    JSONArray nodesArr = new JSONArray();
    for (UIGraphNode node : uiGraphNodes) {
      JSONObject nodeObj = new JSONObject();
      nodeObj.put("xpath", node.getXpath());
//      String nodeMBR = node.getX() + "," + node.getY() + "," + node.getWidth() + "," + node.getHeight();
//      nodeObj.put("MBR", nodeMBR);
      nodesArr.put(nodeObj);
    }
    return nodesArr;
  }

  public JSONArray prepareEdges(Set<UIGraphEdge> uiGraphEdges) {

    JSONArray edgesArr = new JSONArray();

    for (UIGraphEdge edge : uiGraphEdges) {
      JSONObject edgeObj = new JSONObject();
      edgeObj.put("v_s", edge.getV1().getXpath());
      edgeObj.put("v_t", edge.getV2().getXpath());
      edgeObj.put("phi", edge.getPhi());
      edgesArr.put(edgeObj);
    }
    return edgesArr;
  }

  public JSONArray prepareStateTransitionArr(List<Pair<Pair<Pair<String, String>, Integer>, Pair<String, String>>> nextStateTransitionList) {
    JSONArray stateTransitionArr = new JSONArray();
//    List<Pair<Pair<UIGraphNode, String>, Integer>> nextStateTransitionList = new ArrayList<>();
//    for (Pair<Pair<Pair<UIGraphNode, String>, Integer>, Pair<UIGraphNode, UIGraphNode>> inner : nextStateTransitionListTemp) {
//      nextStateTransitionList.add(inner.getLeft());
//    }
    // process as usual kaf paper
    for (Pair<Pair<Pair<String, String>, Integer>, Pair<String, String>> nextStateTransition : nextStateTransitionList) {
      JSONObject nextStateTransitionObj = new JSONObject();



      nextStateTransitionObj.put("v_s", nextStateTransition.getLeft().getLeft().getLeft());
      nextStateTransitionObj.put("phi", nextStateTransition.getLeft().getLeft().getRight());
      nextStateTransitionObj.put("nextStateID", nextStateTransition.getLeft().getRight());
      nextStateTransitionObj.put("v_t", nextStateTransition.getRight().getLeft());
      nextStateTransitionObj.put("v_t_successor", nextStateTransition.getRight().getRight());


      stateTransitionArr.put(nextStateTransitionObj);
    }
    return stateTransitionArr;
  }

  public JSONArray prepareStateInfoArr(UIGraphState uiGraphState) {
    JSONArray stateInfoArr = new JSONArray();
    //stateInfoArr.put(new JSONObject().put("type", uiGraphType));
    //stateInfoArr.put(new JSONObject().put("phase", uiGraphState.getCreatedAtWhatPhase()));
    stateInfoArr.put(new JSONObject().put("thisStateID", uiGraphState.getUniversalStateID()));
    stateInfoArr.put(new JSONObject().put("parentStateID", uiGraphState.getParentUniversalStateID()));
    return stateInfoArr;
  }

  public JSONObject prepareUIGraphStateObj(JSONArray stateInfoArr, JSONArray nodesArr, JSONArray edgesArr, JSONArray stateTransitionArr) {
    JSONObject uiGraphStateObj = new JSONObject();
    uiGraphStateObj.put("state_properties", stateInfoArr);
    uiGraphStateObj.put("nodes", nodesArr);
    uiGraphStateObj.put("edges", edgesArr);
    uiGraphStateObj.put("stateTransition", stateTransitionArr);
    return uiGraphStateObj;
  }



  public JSONArray prepareVSpecial(UIGraphState uiGraph) {
    JSONArray vSpecialArr = new JSONArray();

    UIGraphNode v_entry;
    UIGraphNode v_entry_successor;
//    UIGraphNode v_entry_successor_successor;
//    UIGraphNode v_entry_successor_successor_successor;


    try {
//      if (uiGraphType.equals("KNFG")) {
//      System.out.println(uiGraph.getV_entry());
        v_entry = uiGraph.getV_entry();
//        System.out.println(v_entry.getXpath());
        vSpecialArr.put(new JSONObject().put("v_entry", v_entry.getXpath()));

        v_entry_successor = uiGraph.getV_entry_successor();
//      System.out.println(v_entry_successor.getXpath());
        vSpecialArr.put(new JSONObject().put("v_entry_successor", v_entry_successor.getXpath()));

//        v_entry_successor_successor = uiGraph.get_v_entry_successor_successor();
//        vSpecialArr.put(new JSONObject().put("v_entry_successor_successor", v_entry_successor_successor.getXpath()));
//
//        v_entry_successor_successor_successor = uiGraph.get_v_entry_successor_successor_successor();
//        vSpecialArr.put(new JSONObject().put("v_entry_successor_successor_successor", v_entry_successor_successor_successor.getXpath()));
//      }

    } catch (Exception e) {
      e.printStackTrace();
    }// in case of empty or null KNFG
    return vSpecialArr;
  }

  public String writeUIGraphOutput() {
    // initialize file writer
    WriteToFile wtf = new WriteToFile(filePath);
    /////// finalize UIGraph main JSON obj
    JSONObject uiGraphMainObj = new JSONObject();
    JSONArray uiGraphStateArr = new JSONArray();
    for (UIGraphState uiGraphState : uiGraphStateList) {
      UIGraph uiGraph = uiGraphState.getUigraph();
      // prepare nodes of KNFG JSON data
      JSONArray nodesArr = prepareNodes(uiGraph.getNodes());
      // prepare edges of KNFG JSON data
      JSONArray edgesArr = prepareEdges(uiGraph.getEdges());
      // prepare state transition JSON data
      JSONArray stateTransitionArr = prepareStateTransitionArr(uiGraphState.getNextStateTransitionList());
      JSONArray stateInfoArr = prepareStateInfoArr(uiGraphState);
      // prepare state info JSON data
      // UIGraph obj for current state
      JSONObject uiGraphStateObj = prepareUIGraphStateObj(stateInfoArr, nodesArr, edgesArr, stateTransitionArr);

      // invisible nodes
//      uiGraphStateObj.put("invisibleNodes", prepareInvisibleNode(uiGraph));

      // prepare oracle Dom sequence JSON data
//      uiGraphStateObj.put("visibleCtrlDomSequence", prepareOracleDomSequence(uiGraphState));

      // prepare state transition JSON data
//      Set<Pair<UIGraphNode, String>> changeOfContextTrapsList = uiGraphState.getChangeOfContextTrapsSet();
//      for (Pair<UIGraphNode, String> changeOfContextTrap : changeOfContextTrapsList) {
//        JSONObject changeOfContextTrapObj = new JSONObject();
//        changeOfContextTrapObj.put("v_s", changeOfContextTrap.getLeft().getXpath());
//        changeOfContextTrapObj.put("phi", changeOfContextTrap.getRight());
//      }
//
      System.out.println(uiGraphState.getUniversalStateID());
      uiGraphStateObj.put("v_special", prepareVSpecial(uiGraphState));


      // prepare nodes that caused mutation to be observed (for potential activation edges)
//      JSONArray nodesWithPotentialMOEdgesArr = new JSONArray();    // empty if not knfg
//      if (uiGraph.getClass().getSimpleName().equals("KNFG")) {
//        Set<UIGraphNode> uiGraphNodesWithPotentialMOEdges = uiGraph.getNodesWithPotentialMOEdges();
//        for (UIGraphNode nodeWithPotentialMOEdges : uiGraphNodesWithPotentialMOEdges) {
//          JSONObject nodeWithPotentialMOEdgesObj = new JSONObject();
//          nodeWithPotentialMOEdgesObj.put("xpath", nodeWithPotentialMOEdges.getXpath());
//          nodesWithPotentialMOEdgesArr.put(nodeWithPotentialMOEdgesObj);
//        }
//      }
//      uiGraphStateObj.put("nodesWithPotentialMOEdges", nodesWithPotentialMOEdgesArr);

      uiGraphStateArr.put(uiGraphStateObj);
    }

    uiGraphMainObj.put("UIGraphStates", uiGraphStateArr);

    // format and write to JSON file
    String prettyKNFGJsonString = uiGraphMainObj.toString(3);

    wtf.write(prettyKNFGJsonString);
    return prettyKNFGJsonString;

  }

}
