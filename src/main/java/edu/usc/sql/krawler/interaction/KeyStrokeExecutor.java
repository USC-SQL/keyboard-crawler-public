package edu.usc.sql.krawler.interaction;


import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;

/**
 * this class is used to execute the set of all keyboard interactions \Phi_K.  it is used to
 * interact with the controls in the PUT to crawl the resulting behaviors
 */

public class KeyStrokeExecutor {

  public static void sendKey(String key, WebElement we) {
    switch (key) {
      case "SHIFTTAB":
        we.sendKeys(Keys.SHIFT, Keys.TAB);
        break;
      case "TAB":
        we.sendKeys(Keys.TAB);
        break;
      case "UP":
        we.sendKeys(Keys.ARROW_UP);
        break;
      case "DOWN":
        we.sendKeys(Keys.ARROW_DOWN);
        break;
      case "LEFT":
        we.sendKeys(Keys.ARROW_LEFT);
        break;
      case "RIGHT":
        we.sendKeys(Keys.ARROW_RIGHT);
        break;
      case "SPACE":
        we.sendKeys(Keys.SPACE);
        break;
      case "ENTER":
        we.sendKeys(Keys.ENTER);
        break;
      case "ESCAPE":
        we.sendKeys(Keys.ESCAPE);
        break;
      case "BACKSPACE":
        we.sendKeys(Keys.BACK_SPACE);
        break;
      case "A":
        we.sendKeys("A");
        break;
      case "B":
        we.sendKeys("B");
        break;
      case "C":
        we.sendKeys("C");
        break;
      case "D":
        we.sendKeys("D");
        break;
      case "E":
        we.sendKeys("E");
        break;
      case "F":
        we.sendKeys("F");
        break;
      case "G":
        we.sendKeys("G");
        break;
      case "H":
        we.sendKeys("H");
        break;
      case "I":
        we.sendKeys("I");
        break;
      case "J":
        we.sendKeys("J");
        break;
      case "K":
        we.sendKeys("K");
        break;
      case "L":
        we.sendKeys("L");
        break;
      case "M":
        we.sendKeys("M");
        break;
      case "N":
        we.sendKeys("N");
        break;
      case "O":
        we.sendKeys("O");
        break;
      case "P":
        we.sendKeys("P");
        break;
      case "Q":
        we.sendKeys("Q");
        break;
      case "R":
        we.sendKeys("R");
        break;
      case "S":
        we.sendKeys("S");
        break;
      case "T":
        we.sendKeys("T");
        break;
      case "U":
        we.sendKeys("U");
        break;
      case "V":
        we.sendKeys("V");
        break;
      case "W":
        we.sendKeys("W");
        break;
      case "X":
        we.sendKeys("X");
        break;
      case "Y":
        we.sendKeys("Y");
        break;
      case "Z":
        we.sendKeys("Z");
        break;
      case "1":
        we.sendKeys(Keys.NUMPAD1);
        break;
      case "2":
        we.sendKeys(Keys.NUMPAD2);
        break;
      case "3":
        we.sendKeys(Keys.NUMPAD3);
        break;
      case "4":
        we.sendKeys(Keys.NUMPAD4);
        break;
      case "5":
        we.sendKeys(Keys.NUMPAD5);
        break;
      case "6":
        we.sendKeys(Keys.NUMPAD6);
        break;
      case "7":
        we.sendKeys(Keys.NUMPAD7);
        break;
      case "8":
        we.sendKeys(Keys.NUMPAD8);
        break;
      case "9":
        we.sendKeys(Keys.NUMPAD9);
        break;
      case "0":
        we.sendKeys(Keys.NUMPAD0);
        break;
      case "ALT":
        we.sendKeys(Keys.ALT);
        break;
      case "LEFT_ALT":
        we.sendKeys(Keys.LEFT_ALT);
        break;
      case "LEFT_CONTROL":
        we.sendKeys(Keys.CONTROL);
        break;
      case "§":
        we.sendKeys("§");
        break;
      case "[":
        we.sendKeys("[");
        break;
      case "]":
        we.sendKeys("]");
        break;
      case ";":
        we.sendKeys(";");
        break;
      case "'":
        we.sendKeys("'");
        break;
      case "\\":
        we.sendKeys("\\");
        break;
      case ",":
        we.sendKeys(",");
        break;
      case ".":
        we.sendKeys(".");
        break;
      case "/":
        we.sendKeys("/");
        break;
      case "`":
        we.sendKeys("`");
        break;
      case "-":
        we.sendKeys("-");
        break;
      case "=":
        we.sendKeys("=");
        break;
    }
  }

  public static void pressShiftTab(WebElement we) {
    we.sendKeys(Keys.SHIFT, Keys.TAB);
  }

  public static void pressTab(WebElement we) {
    we.sendKeys(Keys.TAB);
  }

  public static void typeString(WebElement we, String s) {
    we.sendKeys(s);
  }

}
