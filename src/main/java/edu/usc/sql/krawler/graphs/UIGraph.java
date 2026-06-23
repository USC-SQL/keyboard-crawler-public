package edu.usc.sql.krawler.graphs;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class UIGraph {


  public Set<UIGraphNode> nodes;
  public Set<UIGraphEdge> edges;
  public UIGraphNode v_entry;
  public UIGraphNode v_entry_successor;
  public UIGraphNode v_entry_successor_successor;
  public UIGraphNode v_entry_successor_successor_successor;
//  public List<KWALIElementWrapper> invisibleCtrlElems_kew;
//  @Getter
//  public Set<UIGraphNode> invisibleCtrlElems_node;
//  //// krf from kafe
//  public List<KWALIElementWrapper> ctrlElemsWithPotentialMOEdges;
//  @Getter
//  public Set<UIGraphNode> nodesWithPotentialMOEdges;
//  public Set<Pair<KWALIElementWrapper, String>> changeOfContextTraps;


  public UIGraph() {
    this.nodes = new HashSet<>();
    this.edges = new HashSet<>();

//    this.invisibleCtrlElems_kew = new ArrayList<>();
//    this.invisibleCtrlElems_node = new HashSet<>();
//
//    //// krf from kafe
//    this.ctrlElemsWithPotentialMOEdges = new ArrayList<>();
//    this.nodesWithPotentialMOEdges = new HashSet<>();
//
//    this.changeOfContextTraps = new HashSet<>();


  }



  @Override
  public String toString() {
    String output = "UIGraph: \n";
    for (UIGraphEdge edge : edges) {
      UIGraphNode v1 = edge.getV1();
      UIGraphNode v2 = edge.getV2();
      output += "[" + v1.getXpath() + "] --" + edge.getPhi() + "--> [" + v2.getXpath() + "];\n";
    }
    return output;
  }

}
