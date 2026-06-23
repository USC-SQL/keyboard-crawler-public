package edu.usc.sql.krawler.buildedges.intrastate.utils;

import edu.usc.sql.krawler.utilities.CheckIfExteralLink;
import org.openqa.selenium.WebElement;

public class CrawlEdgeExceptions {


  public static boolean isNotToExecuteAction(WebElement we, String action, String url) {
    if (!(action.equalsIgnoreCase("TAB") || action.equalsIgnoreCase("SHIFTTAB") || action.equalsIgnoreCase("ENTER")) && (we.getTagName() != null && we.getTagName().equalsIgnoreCase("A"))) {
      return true;        // ignore exception if not actuation action
    }
//    // handle if element to perform actions to opens a new browser window
//    if (we.getAttribute("target") != null && we.getAttribute("target").contains("blank")) {
//      return true;
//    }
//
//    // handle if element to perform actions to opens a mailing dialog
//    if (we.getAttribute("href") != null && we.getAttribute("href").startsWith("mailto:")) {
//      return true;
//    }


    // handle if link element opens exterally
    if (we.getAttribute("href") != null && CheckIfExteralLink.isExternal(url, we.getAttribute("href"))) {
      return true;
    }

    return false;
  }

  public static boolean isNotToCreateCrawlAction(String xpath, String action) {
    if (!(action.equalsIgnoreCase("TAB") || action.equalsIgnoreCase("SHIFTTAB") || action.equalsIgnoreCase("ENTER")) && (findLastInstance(xpath) != null & findLastInstance(xpath).equalsIgnoreCase("A"))) {
      return true;        // ignore exception if not actuation action
    }

    return false;
  }

  public static String findLastInstance(String input) {
    int lastBracketIndex = input.lastIndexOf('[');
    if (lastBracketIndex == -1) {
      return null; // No "[" found
    }

    int lastSlashIndex = input.lastIndexOf('/', lastBracketIndex);
    if (lastSlashIndex == -1) {
      return null; // No "/" found before "["
    }

    return input.substring(lastSlashIndex + 1, lastBracketIndex);
  }
}
