package edu.usc.sql.krawler.graphs;


import lombok.Getter;


@Getter
public class UIGraphEdge implements Comparable<UIGraphEdge> {

  protected UIGraphNode v1;
  protected UIGraphNode v2;
  protected String var;

  public UIGraphEdge(UIGraphNode v1, UIGraphNode v2, String var) {
    this.v1 = v1;
    this.v2 = v2;
    this.var = var;
  }

  @Override
  public boolean equals(Object o) {

    if (o == this) return true;
    if (!(o instanceof UIGraphEdge)) {
      return false;
    }

    UIGraphEdge uiGraphEdge = (UIGraphEdge) o;

    return uiGraphEdge.getV1().equals(v1) &&
          uiGraphEdge.getV2().equals(v2) &&
          uiGraphEdge.getVar().equals(var);
  }

  //Idea from effective Java : Item 9
  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + v1.hashCode();
    result = 31 * result + v2.hashCode();
    result = 31 * result + var.hashCode();
    return result;
  }


  @Override
  public String toString() {
    return "[" + v1 + ",  " + v2 + ",  " + var + "]";
  }

//  public static void main(String[] args) {
//    UIGraphNode v1 = new UIGraphNode("kk");
//    UIGraphNode v2 = new UIGraphNode("km");
//    UIGraphNode v3 = new UIGraphNode("kr");
//
//    UIGraphEdge e1 = new UIGraphEdge(v1, v3, "tab");
//    UIGraphEdge e2 = new UIGraphEdge(v1, v3, "tab");
//    UIGraphEdge e3 = new UIGraphEdge(v2, v3, "tab");
//    UIGraphEdge e4 = new UIGraphEdge(v2, v1, "tab");
//
//    Map<UIGraphEdge, String> map = new HashMap<UIGraphEdge, String>();
//    map.put(e1, "CSE");
//    map.put(e2, "IT");
//    map.put(e3, "CS");
//    map.put(e4, "EE");
//
//  }

  @Override
  public int compareTo(UIGraphEdge edge2) {
    return v1.getXpath().compareTo(edge2.getV1().getXpath());
  }

  public String getPhi() {
    return var;
  }
}
