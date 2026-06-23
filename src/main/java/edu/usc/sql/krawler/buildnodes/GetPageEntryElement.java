package edu.usc.sql.krawler.buildnodes;

import edu.usc.sql.krawler.interaction.KeyStrokeExecutor;
import edu.usc.sql.krawler.utilities.Utils;
import lombok.Getter;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

@Getter
public class GetPageEntryElement {

    String v_entry_xpath = "nulld";
    String v_entry_successor_xpath = "nulld";
    String v_entry_successor_successor_xpath = "nulld";
    String v_entry_successor_successor_successor_xpath = "nulld";

    WebDriver refDriver;

    public GetPageEntryElement(WebDriver refDriver) {
        this.refDriver = refDriver;
    }

    public void process() {

        WebElement v_entry = refDriver.switchTo().activeElement();
        v_entry_xpath = Utils.getAbsoluteXPath(refDriver, v_entry);
        KeyStrokeExecutor.pressTab(refDriver.switchTo().activeElement());

        WebElement v_entry_successor = refDriver.switchTo().activeElement();
        v_entry_successor_xpath = Utils.getAbsoluteXPath(refDriver, v_entry_successor);
        KeyStrokeExecutor.pressTab(refDriver.switchTo().activeElement());

        WebElement v_entry_successor_successor = refDriver.switchTo().activeElement();
        v_entry_successor_successor_xpath = Utils.getAbsoluteXPath(refDriver, v_entry_successor_successor);
        KeyStrokeExecutor.pressTab(refDriver.switchTo().activeElement());

        WebElement v_entry_successor_successor_successor = refDriver.switchTo().activeElement();
        v_entry_successor_successor_successor_xpath = Utils.getAbsoluteXPath(refDriver, v_entry_successor_successor_successor);

    }



}
