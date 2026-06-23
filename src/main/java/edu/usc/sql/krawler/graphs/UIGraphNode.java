package edu.usc.sql.krawler.graphs;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;


@Getter
@Setter
public class UIGraphNode {

  public String xpath;
  public int x, y, width, height;


  public UIGraphNode(String xpath) {
    this.xpath = xpath;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    UIGraphNode that = (UIGraphNode) o;
    return Objects.equals(xpath, that.xpath);
  }

  @Override
  public int hashCode() {
    return Objects.hash(xpath);
  }

  @Override
  public String toString() {
    return "[" + xpath + "]";
  }


//  public static void main(String[] args) {
//    UIGraphNode v1 = new UIGraphNode("kk");
//    UIGraphNode v2 = new UIGraphNode("kk");
//
//    Map<UIGraphNode, String> map = new HashMap<UIGraphNode, String>();
//    map.put(v1, "CSE");
//    map.put(v2, "IT");
//
//  }


}
