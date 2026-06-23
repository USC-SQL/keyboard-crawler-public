package edu.usc.sql.krawler.buildnodes;

import edu.usc.sql.krawler.utilities.Utils;
import edu.usc.sql.krawler.utilities.ReadInJSResource;
import lombok.Getter;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ExtractNodesJavaScript {

    WebDriver refDriver;


    @Getter
    Set<String> nodesXpaths;


    public ExtractNodesJavaScript(WebDriver refDriver) {
        this.refDriver = refDriver;
        this.nodesXpaths = new HashSet<>();
    }

    public void process(){


        ReadInJSResource obj = new ReadInJSResource();
        String script3 = obj.read(obj, "getNodesJavaScript.js");
        List<WebElement> cc = (ArrayList<WebElement>)((JavascriptExecutor) refDriver).executeScript(script3);

        List<WebElement> dd = filterVisibleElements(cc);

        obtainNodesInfo(refDriver, dd);


    }

    public void obtainNodesInfo(WebDriver refDriver, List<WebElement> webElements){


        for(WebElement we:webElements){
            try {
                String xpath = Utils.getAbsoluteXPath(refDriver, we);
                nodesXpaths.add(xpath);
            } catch (Exception e) {
                e.printStackTrace();
            }
//            KWALIElementWrapper kew = new KWALIElementWrapper(we, xpath, "", "", "");
//            nodes.add(kew);
        }
    }

    public List<WebElement> filterVisibleElements(List<WebElement> webElements) {
        List<WebElement> filteredWebElements = new ArrayList<>();
        for(WebElement we : webElements){
            if(we.isDisplayed()){
                filteredWebElements.add(we);
            }
        }
        return filteredWebElements;
    }


}
