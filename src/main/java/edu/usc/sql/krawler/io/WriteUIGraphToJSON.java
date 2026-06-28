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

  private final String filePath;
  private final List<UIGraphState> uiGraphStateList;

  public WriteUIGraphToJSON(String filePath, List<UIGraphState> uiGraphStateList) {
    this.filePath = filePath;
    this.uiGraphStateList = uiGraphStateList;
  }

  public JSONArray prepareNodes(Set<UIGraphNode> uiGraphNodes) {
    JSONArray nodesArr = new JSONArray();

    for (UIGraphNode node : uiGraphNodes) {
      JSONObject nodeObj = new JSONObject();
      nodeObj.put("xpath", node.getXpath());
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

  public JSONArray prepareStateTransitionArr(
          List<Pair<Pair<Pair<String, String>, Integer>, Pair<String, String>>> nextStateTransitionList) {

    JSONArray stateTransitionArr = new JSONArray();

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
    stateInfoArr.put(new JSONObject().put("thisStateID", uiGraphState.getUniversalStateID()));
    stateInfoArr.put(new JSONObject().put("parentStateID", uiGraphState.getParentUniversalStateID()));
    return stateInfoArr;
  }

  public JSONObject prepareUIGraphStateObj(
          JSONArray stateInfoArr,
          JSONArray nodesArr,
          JSONArray edgesArr,
          JSONArray stateTransitionArr) {

    JSONObject uiGraphStateObj = new JSONObject();
    uiGraphStateObj.put("state_properties", stateInfoArr);
    uiGraphStateObj.put("nodes", nodesArr);
    uiGraphStateObj.put("edges", edgesArr);
    uiGraphStateObj.put("stateTransition", stateTransitionArr);
    return uiGraphStateObj;
  }

  public JSONArray prepareVSpecial(UIGraphState uiGraphState) {
    JSONArray vSpecialArr = new JSONArray();

    try {
      UIGraphNode vEntry = uiGraphState.getV_entry();
      vSpecialArr.put(new JSONObject().put("v_entry", vEntry.getXpath()));

      UIGraphNode vEntrySuccessor = uiGraphState.getV_entry_successor();
      vSpecialArr.put(new JSONObject().put("v_entry_successor", vEntrySuccessor.getXpath()));
    } catch (Exception e) {
      e.printStackTrace();
    }

    return vSpecialArr;
  }

  public String writeUIGraphOutput() {
    WriteToFile writer = new WriteToFile(filePath);

    JSONObject uiGraphMainObj = new JSONObject();
    JSONArray uiGraphStateArr = new JSONArray();

    for (UIGraphState uiGraphState : uiGraphStateList) {
      UIGraph uiGraph = uiGraphState.getUigraph();

      JSONArray nodesArr = prepareNodes(uiGraph.getNodes());
      JSONArray edgesArr = prepareEdges(uiGraph.getEdges());
      JSONArray stateTransitionArr = prepareStateTransitionArr(uiGraphState.getNextStateTransitionList());
      JSONArray stateInfoArr = prepareStateInfoArr(uiGraphState);

      JSONObject uiGraphStateObj = prepareUIGraphStateObj(
              stateInfoArr,
              nodesArr,
              edgesArr,
              stateTransitionArr
      );

      System.out.println(uiGraphState.getUniversalStateID());

      uiGraphStateObj.put("v_special", prepareVSpecial(uiGraphState));
      uiGraphStateArr.put(uiGraphStateObj);
    }

    uiGraphMainObj.put("UIGraphStates", uiGraphStateArr);

    String prettyJsonString = uiGraphMainObj.toString(3);
    writer.write(prettyJsonString);

    return prettyJsonString;
  }
}