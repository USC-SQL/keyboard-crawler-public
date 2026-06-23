package edu.usc.sql.krawler.buildedges.interstate.utils;

import edu.usc.sql.krawler.utilities.CheckIfExteralLink;
import org.openqa.selenium.WebElement;

import java.net.URI;
import java.net.URL;

public class CrawlExceptions {


  public static boolean isNotToExecuteAction(WebElement we, String action, String url) {
    if (!(action.equals("ENTER") || action.equals("CLICK")))
      return false;        // ignore exception if not actuation action

    // handle if element to perform actions to opens a new browser window
    if (we.getAttribute("target") != null && we.getAttribute("target").contains("blank")) {
      return true;
    }

    // handle if element to perform actions to opens a mailing dialog
    if (we.getAttribute("href") != null && we.getAttribute("href").startsWith("mailto:")) {
      return true;
    }

    // handle if link element opens exterally
    if (we.getAttribute("href") != null && CheckIfExteralLink.isExternal(url, we.getAttribute("href"))) {
      return true;
    }


    return false;
  }





}
