package edu.usc.sql.krawler.graphs;


import edu.usc.sql.krawler.utilities.Pair;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Setter
@Getter
public class UIGraphState {

//  String uiGraphType;
//  Set<KWALIElementWrapper> ctrlElems;
//  Set<KWALIEdge> edgeSet;
//  Set<ArrayList<Pair<KWALIElementWrapper, String>>> crawlTraceToThisState;// set of crawl-traces leading to current state
//  List<String> visibleDomXpaths;
  UIGraph uigraph;
//  String createdAtWhatPhase = "";
//  Set<Integer> parentUniversalStateIDs;
  int parentUniversalStateID;
  int universalStateID;
//  boolean isADialogState;
//  DomState prePreModalTrigger;
//  public ArrayList<ArrayList<String>> ctrlElementClusters;

//  public void setADialogState(boolean isADialogState) {
//    this.isADialogState = isADialogState;
//  }

  //// before/after DOM representation for outputting serialized DOM object file
//  DomNode preModalTriggerRoot;
//
//  DomNode postModalTriggerRoot;

  // the inner dialog elements representation
//  List<String> visibleDomInsideDialogXpaths;

  // triggers
//  public UIGraphNode triggerThatActivatedThisCurrentModalState;

  /////////////// end knf paper addition ////////////////
  ///////// krf paper addition  /////////////
//  Set<Functionality> extractedFunctionalities = new HashSet<>();
//
//  Functionalities functionalities;

  // v_0 is inside the KNFG
  UIGraphNode v_entry;
  UIGraphNode v_entry_successor;

  List<Pair<Pair<Pair<String, String>, Integer>, Pair<String, String>>> nextStateTransitionList;
//  Set<Pair<UIGraphNode, String>> changeOfContextTrapsSet;// why need list?  why can't be set?

  public UIGraphState(UIGraph uigraph) {
    this.uigraph = uigraph;
//    this.ctrlElems = new HashSet<>();
//    this.edgeSet = new HashSet<>();
//
//    this.uiGraphType = uiGraphType;
//    this.crawlTraceToThisState = new HashSet<>();

    this.nextStateTransitionList = new ArrayList<>();
//    this.changeOfContextTrapsSet = new HashSet<>();
//
//    this.parentUniversalStateIDs = new HashSet<>();
//    this.deltaStateTransitionInEdges = new HashSet<>();

  }

//  public void addToCrawlTraceToThisState(ArrayList<Pair<KWALIElementWrapper, String>> crawlTraceToThisState) {
//    this.crawlTraceToThisState.add(crawlTraceToThisState);
//  }




//  public void setV_entry(KWALIElementWrapper v_entry) {
//    this.v_entry = new UIGraphNode(v_entry.getXpath());            // doesn't have to be same memory reference object because KEW and uigragh node "equals" has been overloaded
//  }

//  public void addToChangeOfContextTrapsSet2(Set<Pair<KWALIElementWrapper, String>> changeOfContextTraps) {
//    List<Pair<UIGraphNode, String>> changeOfContextTraps2 = new ArrayList<>();
//    for (Pair<KWALIElementWrapper, String> pair : changeOfContextTraps) {
//      changeOfContextTraps2.add(new Pair<>(new UIGraphNode(pair.getLeft().getXpath()), pair.getRight()));
//    }
//    this.changeOfContextTrapsSet.addAll(changeOfContextTraps2);
//  }

//  public void addToNextStateTransition(UIGraphNode v_transition, String action, int destination, UIGraphNode v_entry, UIGraphNode v_entry_successor) {
//    //this.nextStateTransitionList.add(new Pair<>(new Pair<>(new Pair<>(v_transition, action), destination), new Pair<>(v_entry, v_entry_successor)));
//  }

//  public void addToNextStateTransition(KWALIElementWrapper v_transition, String action, int destination, KWALIElementWrapper v_entry, KWALIElementWrapper v_entry_successor) {
//    this.nextStateTransitionList.add(new Pair<>(new Pair<>(new Pair<>(new UIGraphNode(v_transition.getXpath()), action), destination), new Pair<>(new UIGraphNode(v_entry.getXpath()), new UIGraphNode(v_entry_successor.getXpath()))));
//  }

  /////////////////////////////////////////////////////
  //Idea from effective Java : Item 9
  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + uigraph.hashCode();
    return result;
  }



  //////////// IMPORTANT TO decide whether a state has already been explored ////////////
  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    UIGraphState state2 = (UIGraphState) o;
    return uigraph.equals(state2.getUigraph());
  }



}

