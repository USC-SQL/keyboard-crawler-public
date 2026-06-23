package edu.usc.sql.krawler.utilities;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.Future;

import com.yahoo.platform.yui.compressor.JavaScriptCompressor;
//import edu.gatech.xpert.dom.DomNode;
//import edu.usc.sql.krawler.buildgraphs.StateToExplore;
//import edu.usc.sql.krawler.graphs.*;
//import edu.usc.sql.krawler.kff.cluster.ElementWrapper;

import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.safari.SafariOptions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;

//import edu.usc.sql.krawler.buildedges.GraphBuilderInterface;
//import edu.usc.sql.krawler.buildedges.KWALIEdge;
//import edu.usc.sql.krawler.buildgraphs.UIGraphState;
//import edu.usc.sql.krawler.buildnodes.KWALIElementWrapper;
//import edu.usc.sql.krawler.NodesVisualRepBuilder;

import io.github.bonigarcia.wdm.WebDriverManager;

public class Utils {

//  public static Map<String, ElementWrapper> xpathToElementMap = new HashMap<>();

  private static void configureFirefoxBinary(FirefoxOptions options) {
    List<String> candidates = Arrays.asList(
            System.getenv("FIREFOX_BINARY"),
            System.getProperty("firefox.binary"),

            // Linux
            "/usr/bin/firefox",
            "/usr/local/bin/firefox",
            "/snap/bin/firefox",
            "/usr/bin/firefox-esr",

            // macOS
            "/Applications/Firefox.app/Contents/MacOS/firefox",
            System.getProperty("user.home") + "/Applications/Firefox.app/Contents/MacOS/firefox",
            "./browser-binaries/Firefox.app/Contents/MacOS/firefox",
            "./src/main/resources/firefox/Firefox.app/Contents/MacOS/firefox"
    );

    for (String path : candidates) {
      if (path != null && !path.trim().isEmpty()) {
        File file = new File(path);
        if (file.exists() && file.canExecute()) {
          options.setBinary(file.getAbsolutePath());
          return;
        }
      }
    }

    throw new RuntimeException(
            "Firefox binary not found. Install Firefox or set FIREFOX_BINARY, for example:\n" +
                    "  export FIREFOX_BINARY=/usr/bin/firefox\n" +
                    "Checked Linux and macOS Firefox locations."
    );
  }

  private static File findFirefoxExecutable() {
    List<String> candidatePaths = new ArrayList<>();

    candidatePaths.add("/Applications/Firefox.app");
    candidatePaths.add("/Applications/Firefox.app/Contents/MacOS/firefox");
    candidatePaths.add("/Applications/Firefox.app/Contents/MacOS/firefox-bin");

    candidatePaths.add(System.getProperty("user.home")
            + File.separator
            + "Applications"
            + File.separator
            + "Firefox.app");

    candidatePaths.add(System.getProperty("user.dir")
            + File.separator
            + "browser-binaries"
            + File.separator
            + "Firefox.app");

    candidatePaths.add(System.getProperty("user.dir")
            + File.separator
            + "src"
            + File.separator
            + "main"
            + File.separator
            + "resources"
            + File.separator
            + "firefox"
            + File.separator
            + "Firefox.app");

    for (String candidatePath : candidatePaths) {
      File executable = resolveFirefoxExecutable(candidatePath);

      if (executable != null && executable.exists()) {
        return executable;
      }
    }

    return null;
  }

//  private static File resolveFirefoxExecutable(String path) {
//    File file = new File(path);
//
//    if (!file.exists()) {
//      return null;
//    }
//
//    if (file.isDirectory() && file.getName().endsWith(".app")) {
//      File firefox = new File(file, "Contents/MacOS/firefox");
//      if (firefox.exists()) {
//        return firefox;
//      }
//
//      File firefoxBin = new File(file, "Contents/MacOS/firefox-bin");
//      if (firefoxBin.exists()) {
//        return firefoxBin;
//      }
//
//      return null;
//    }
//
//    return file;
//  }

  private static File resolveFirefoxExecutable(String path) {
    File file = new File(path);

    if (!file.exists()) {
      return null;
    }

    if (file.isDirectory() && file.getName().endsWith(".app")) {
      File firefox = new File(file, "Contents/MacOS/firefox");
      if (firefox.exists()) {
        return firefox;
      }

      File firefoxBin = new File(file, "Contents/MacOS/firefox-bin");
      if (firefoxBin.exists()) {
        return firefoxBin;
      }

      return null;
    }

    return file;
  }


  public static WebDriver getNewDriver() {

    if (Config.browserType.equals("chrome")) {
      ChromeOptions options = new ChromeOptions();
      options.addArguments("--disable-web-security");
      options.addArguments("--allow-running-insecure-content");
      options.addArguments("--disable-gpu");
      options.addArguments("--ignore-certificate-errors");
      options.addArguments("--disable-extensions");
      options.addArguments("--no-sandbox");
      options.addArguments("--disable-dev-shm-usage");
      options.addArguments("--headless"); // Enable headless mode

      WebDriverManager wdm = WebDriverManager.chromedriver();
      wdm.capabilities(options);
      WebDriver driver = wdm.create();
      driver.manage().window().maximize();

      Config.addToDriverResourceList(driver);    // add to FFdriver resource list
      return driver;
    } else if (Config.browserType.equals("edge")) {
      EdgeOptions options = new EdgeOptions();
      options.addArguments("--disable-web-security");
      options.addArguments("--allow-running-insecure-content");
      options.addArguments("--disable-gpu");
      options.addArguments("--ignore-certificate-errors");
      options.addArguments("--disable-extensions");
      options.addArguments("--no-sandbox");
      options.addArguments("--disable-dev-shm-usage");
      options.addArguments("--headless"); // Enable headless mode

      WebDriverManager wdm = WebDriverManager.edgedriver();
      wdm.capabilities(options);
      WebDriver driver = wdm.create();

      driver.manage().window().maximize();

      Config.addToDriverResourceList(driver);    // add to FFdriver resource list
      return driver;
    } else if (Config.browserType.equals("safari")) {
      SafariOptions option = new SafariOptions();

      SafariDriver driver = new SafariDriver(option);
      driver.manage().window().maximize();

      Config.addToDriverResourceList(driver);    // add to FFdriver resource list
      return driver;

    } else {// firefox
      FirefoxOptions options = new FirefoxOptions();
      options.setProfile(new FirefoxProfile());
      options.addPreference("dom.webnotifications.enabled", false);
      options.addArguments("--headless"); // Enable headless mode

      WebDriverManager wdm = WebDriverManager.firefoxdriver();
      wdm.capabilities(options);
      WebDriver driver =  wdm.create();
      driver.manage().window().maximize();

      Config.addToDriverResourceList(driver);    // add to FFdriver resource list
      return driver;
    }
  }

  public static WebDriver getNewDriverWithProxy(int proxyPort) {


    Boolean headless = Config.getHeadlessMode();
    System.out.println("headless mode: " + headless);

    if (Config.browserType.equals("chrome")) {
      Proxy proxy = new Proxy();
      proxy.setHttpProxy("localhost:" + proxyPort);
      proxy.setSslProxy("localhost:" + proxyPort);
      ChromeOptions options = new ChromeOptions();
      options.addArguments("--disable-web-security");
      options.addArguments("--allow-running-insecure-content");
      options.addArguments("--disable-gpu");
      options.addArguments("--ignore-certificate-errors");
      options.addArguments("--disable-extensions");
      options.addArguments("--no-sandbox");
      options.addArguments("--disable-dev-shm-usage");
      options.setCapability(CapabilityType.PROXY, proxy);
      if (headless) {
        options.addArguments("--headless"); // Enable headless mode
      }


      WebDriverManager wdm = WebDriverManager.chromedriver();
      wdm.capabilities(options);
      WebDriver driver = wdm.create();
      driver.manage().window().maximize();

      Config.addToDriverResourceList(driver);    // add to FFdriver resource list
      return driver;

    } else if (Config.browserType.equals("edge")) {
      Proxy proxy = new Proxy();
      proxy.setHttpProxy("localhost:" + proxyPort);
      proxy.setSslProxy("localhost:" + proxyPort);
      EdgeOptions options = new EdgeOptions();
      options.addArguments("--disable-web-security");
      options.addArguments("--allow-running-insecure-content");
      options.addArguments("--disable-gpu");
      options.addArguments("--ignore-certificate-errors");
      options.addArguments("--disable-extensions");
      options.addArguments("--no-sandbox");
      options.addArguments("--disable-dev-shm-usage");
      options.setCapability(CapabilityType.PROXY, proxy);
      if (headless) {
        options.addArguments("--headless"); // Enable headless mode
      }

      WebDriverManager wdm = WebDriverManager.edgedriver();
      wdm.capabilities(options);
      WebDriver driver = wdm.create();
      driver.manage().window().maximize();

      Config.addToDriverResourceList(driver);    // add to FFdriver resource list
      return driver;

    } else { // Firefox
      Proxy proxy = new Proxy();
      proxy.setHttpProxy("localhost:" + proxyPort);
      proxy.setSslProxy("localhost:" + proxyPort);

      FirefoxOptions options = new FirefoxOptions();

      configureFirefoxBinary(options);

      options.setCapability(CapabilityType.PROXY, proxy);
      options.setAcceptInsecureCerts(true);

      FirefoxProfile profile = new FirefoxProfile();
      profile.setPreference("app.update.auto", false);
      profile.setPreference("app.update.enabled", false);
      profile.setPreference("dom.webnotifications.enabled", false);
      profile.setPreference("app.update.silent", true);
      profile.setPreference("dom.webnotifications.enabled", false);
      profile.setPreference("dom.disable_beforeunload", true);
      profile.setPreference("security.enterprise_roots.enabled", true);

      options.setProfile(profile);
      options.addPreference("dom.webnotifications.enabled", false);
      options.addPreference("app.update.auto", false);
      options.addPreference("app.update.enabled", false);
      if (headless) {
        options.addArguments("--headless"); // Enable headless mode
      }

      System.out.println("Utils: " + options.getBinary());
      System.out.println("Utils: " + options.getProfile());

      WebDriverManager wdm = WebDriverManager.firefoxdriver();
      wdm.capabilities(options);
      WebDriver driver = wdm.create();
      driver.manage().window().maximize();

      Config.addToDriverResourceList(driver);    // add to FFdriver resource list
      return driver;
    }

  }


  public static String getXpathJSFunctionCode() {//String functionName) {
    return Utils.getJSScript("/getXpath.js");
  }

//  public static void drawSolutionOnCanvasKEW(Set<KWALIElementWrapper> kew_list, String printType, String subscript, String cornerInfoText) {
//    if (!Config.isToDrawOnCanvas()) {
//      return;
//    }
//    System.out.println("Utils: Drawing solution boxes on empty page..");
//    WebDriver canvasDriver = getNewDriver();
//
//    URL canvaseURL = PageProcessor.class.getResource("/canvas.html");
//    canvasDriver.get(canvaseURL.toString());
//    PageProcessor canvasPageProcessor = new PageProcessor(canvasDriver);
//
//    canvasPageProcessor.drawTextOverlay(cornerInfoText);
//    for (KWALIElementWrapper kew : kew_list) {
//      double[] coords = new double[4];
//      coords[0] = kew.getX_location();
//      coords[1] = kew.getY_location();
//      coords[2] = kew.getX_location() + kew.getWidth();
//      coords[3] = kew.getY_location() + kew.getHeight();
//
//      String elementDisplayIdentifier = "";
//      if (printType.equals("index")) {
//        elementDisplayIdentifier = kew.getThisElementIndex() + subscript;
//      } else if (printType.equals("xpath")) {
//        elementDisplayIdentifier = kew.getXpath() + subscript;
//      }
//
//
//      if (kew.getObtainedByWhatMethod().equalsIgnoreCase("CtrlElementsTypeMatch")) {
//        canvasPageProcessor.drawMBR(coords, "red", elementDisplayIdentifier);
//      } else if (kew.getObtainedByWhatMethod().equalsIgnoreCase("VisualEvents")) {
//        canvasPageProcessor.drawMBR(coords, "blue", elementDisplayIdentifier);
//      } else if (kew.getObtainedByWhatMethod().equalsIgnoreCase("DomLevel1")) {
//        canvasPageProcessor.drawMBR(coords, "black", elementDisplayIdentifier);
//      } else if (kew.getObtainedByWhatMethod().equalsIgnoreCase("DomLevel2")) {
//        canvasPageProcessor.drawMBR(coords, "green", elementDisplayIdentifier);
//      } else if (kew.getObtainedByWhatMethod().equalsIgnoreCase("React")) {
//        canvasPageProcessor.drawMBR(coords, "brown", elementDisplayIdentifier);
//      } else if (kew.getObtainedByWhatMethod().equalsIgnoreCase("CSSpseudo")) {
//        canvasPageProcessor.drawMBR(coords, "yellow", elementDisplayIdentifier);
//      }
//
//      canvasPageProcessor.showCommentInPage();
//    }
//  }

  public static String getAbsoluteXPath(WebDriver driver, WebElement element) {
    String res;
    String script = Utils.getXpathJSFunctionCode() + "return getAbsoluteXPath(arguments[0]);";

    res = (String) ((RemoteWebDriver) driver).executeScript(script, element);
    return res;
  }

  public static String getRealXpath(WebDriver driver, WebElement element) {
    // accounted for iframe
    if (element.getTagName().equalsIgnoreCase("iframe")) {
      driver.switchTo().defaultContent();
      driver.switchTo().frame(element);        // switch into this iframe element
      String xppath = Utils.getAbsoluteXPath(driver, driver.switchTo().activeElement());

      driver.switchTo().defaultContent();
      return xppath;
    } else {
      return Utils.getAbsoluteXPath(driver, element);
    }
  }

  public static void waitForResourceLoad(double secDelay) {
    try {
      Thread.sleep((long) (secDelay * 1000));
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }

  public static void waitForPageLoad(WebDriver refDriver, int maxWaitSeconds) {
    WebDriverWait wait = new WebDriverWait(refDriver, Duration.of(maxWaitSeconds, ChronoUnit.SECONDS));
    ExpectedCondition<Boolean> expectation = new ExpectedCondition<Boolean>() {
      public Boolean apply(WebDriver refDriver) {
        return ((JavascriptExecutor) refDriver).executeScript("return document.readyState").toString().equals("complete");
      }
    };
    try {
      wait.until(expectation);
    } catch (Exception e) {
      System.out.println("Utils: Waited " + maxWaitSeconds + " seconds for page to load... continue.");
    }
    Utils.waitForResourceLoad(Config.extraSecondsAfterWaitForPageLoad);        // ensure all elements are displayed in case of load lag in some subjects (subject dell)
    System.out.println("Utils: Waited extra " + Config.extraSecondsAfterWaitForPageLoad + " seconds.");

    Utils.killWayBackMachineBanner(refDriver);
  }


  public static void killWayBackMachineBanner(WebDriver refDriver) {
    WebElement wm;
    try {
      wm = refDriver.findElement(By.id("wm-ipp-base"));
    } catch (Exception e) {
      System.out.println("Utils: No Waybackmachine Found");
      return;
    }
    if (getAbsoluteXPath(refDriver, wm).equals("/html[1]/body[1]/div[1]") || getAbsoluteXPath(refDriver, wm).equals("/html[1]/body[1]/div[2]") || getAbsoluteXPath(refDriver, wm).equals("/html[1]/body[1]/div[3]")) {
      String script = "arguments[0].remove();";
      ((JavascriptExecutor) refDriver).executeScript(script, wm);
    }
    System.out.println("Utils: Removed Waybackmachine Banner");
  }

  public static void printActiveThreadConcurrencyInfo(List<ArrayList<Future<?>>> futureList) {
    int done = 0, notdone = 0;
    for (ArrayList<Future<?>> futures : futureList) {
      for (Future<?> future : futures) {
        if (future.isDone()) {
          done++;
        } else {
          notdone++;
        }
      }
    }
    System.out.println("Utils: current finished crawl batch: " + Config.getNumOfFinishedStateCrawingThreadsBatches());
  }

//  public static void printActiveThreadConcurrencyInfo(List<ArrayList<Future<?>>> futureList, Queue<StateToExplore> queue, String phase) {
//    int done = 0, notdone = 0;
//    for (ArrayList<Future<?>> futures : futureList) {
//      for (Future<?> future : futures) {
//        if (future.isDone()) {
//          done++;
//        } else {
//          notdone++;
//        }
//      }
//    }
//    System.out.println("");
//    System.out.println("");
//    if (queue == null)
//      System.out.println("done: " + done + "     notdone: " + notdone + "        during phase: " + phase);
//    else
//      System.out.println("done: " + done + "     notdone: " + notdone + "    in queue " + queue.size() + "        during phase: " + phase);
////    System.out.println("current finished crawl batch: " + Config.getNumOfFinishedStateCrawingThreadsBatchesFullsizeKRFG() + " " + Config.getNumOfFinishedStateCrawingThreadsBatchesReflowKRFG());
//    System.out.println("");
//    System.out.println("");
//  }

  // assign kew indices based on their ordering in the dom
//  public static Integer assingKWALIElementIndexByDomSequence(List<String> visibleDomCtrlElemsXpaths, Set<KWALIElementWrapper> kew_array, Integer lastIndexCounter) {//List<KWALIElementWrapper> kew_array_all,
//    System.out.println("Utils: Assigning Element Index in DOM Sequence...");
//
//    for (String xpath : visibleDomCtrlElemsXpaths) {                                    // iterate over actual dom sequence
//      for (KWALIElementWrapper kew : kew_array) {
//        if (kew.getXpath().equals(xpath)) {
//          kew.setThisElementIndex(lastIndexCounter++);
//        }
//      }
//    }
//    System.out.println("Utils: Finished");
//    return lastIndexCounter;
//  }
//
//  public static UIGraphState getUIGraphStateFromUIGraphStateID(List<UIGraphState> stateArr, int stateID) {
//    for (UIGraphState state : stateArr) {
//      if (state.getUniversalStateID() == stateID) {
//        return state;
//      }
//    }
//    System.out.println("Utils: state id " + stateID + " not found");
//    return null;
//  }

  /**
   * Read a file that is in the package structure
   *
   * @param pkgFileName
   * @return file contents
   */
  @SuppressWarnings("rawtypes")
  public static String getPkgFileContents(Class cls, String pkgFileName) {
    // Getting resource as stream object
    InputStream inputStream = cls.getResourceAsStream(pkgFileName);
    ByteArrayOutputStream result = new ByteArrayOutputStream();
    byte[] buffer = new byte[1024];
    int length;
    String resultString = null;
    try {
      while ((length = inputStream.read(buffer)) != -1) {
        result.write(buffer, 0, length);
      }
      resultString = result.toString("UTF-8");
    } catch (IOException e) {
      e.printStackTrace();
    }
    return resultString;
  }

  //Utils
  public static String getJSScript(String resourceFile) {
    String jsScript = getPkgFileContents(Utils.class, resourceFile);
    return jsScript;
  }

  public static void injectPageUnloadDetectScript(WebDriver driver) {
    String script = "window.name = \"false\";\n" + "window.addEventListener('beforeunload', function (e) {\n" + "    window.name = \"true\";\n" + "    console.log(\"navigated away\");\n" + "});";
    ((RemoteWebDriver) driver).executeScript(script);
  }


  public static boolean isPageUnloaded(WebDriver driver) {
    String script = "return window.name";
    String resultString = (String) ((RemoteWebDriver) driver).executeScript(script);
    if (resultString.equalsIgnoreCase("true")) {
      return true;
    } else {
      return false;
    }

  }

  public static void injectPageScrollDetectScript(WebDriver driver) {
    String script = "window.userHasScrolled = \"false\";\n" + "window.onscroll = function (e)\n" + "{\n" + "    window.userHasScrolled = \"true\";\n" + "}";
    ((RemoteWebDriver) driver).executeScript(script);
  }

  public static boolean isPageScrolled(WebDriver driver) {
    String script = "return window.userHasScrolled";
    String resultString = (String) ((RemoteWebDriver) driver).executeScript(script);
    if (resultString.equalsIgnoreCase("true")) {
      return true;
    } else {
      return false;
    }
  }

//  public static void storeGraphDataToUIGraph(UIGraph uiGraph, GraphBuilderInterface gb) {
//    Set<KWALIElementWrapper> ctrlElems = gb.getCtrlElems();    // all kew xpaths
//    for (KWALIElementWrapper kew : ctrlElems) {
//      uiGraph.addNodeToKNFG(kew);
//    }
//    Set<KWALIEdge> edgeSet = gb.getEdgeSet();        // KFEs
//    for (KWALIEdge edge : edgeSet) {
//      uiGraph.addEdgeToKNFG(edge);
//    }
//  }
//
//  public static void storeGraphDataToUIGraph(UIGraph uiGraph, Set<KWALIElementWrapper> ctrlElems, Set<KWALIEdge> edgeSet) {
//    for (KWALIElementWrapper kew : ctrlElems) {
//      uiGraph.addNodeToKNFG(kew);
//    }
//    if (edgeSet != null) {
//      for (KWALIEdge edge : edgeSet) {
//        uiGraph.addEdgeToKNFG(edge);
//      }
//    }
//  }
//
//  // krfg
//  public static void storeGraphDataToUIGraph(UIGraph uiGraph, Set<KWALIElementWrapper> invisibleCtrlElems) {
//    for (KWALIElementWrapper kew : invisibleCtrlElems) {
//      uiGraph.addToInvisibleCtrlElems_kew(kew);
//    }
//  }
//
//  public static void storeGraphDataNodesWithPotentialMOEdgesToUIGraph(UIGraph UIGraph, Set<KWALIElementWrapper> ctrlElemsWithPotentialMOEdges) {
//    for (KWALIElementWrapper kew : ctrlElemsWithPotentialMOEdges) {
//      UIGraph.addNodeWithPotentialMOEdgesToKNFG(kew);
//    }
//  }
//
//  public static void storeChangeOfContextTrapsToUIGraphState(UIGraphState uiGraphState, Set<Pair<KWALIElementWrapper, String>> changeOfContextTraps) {
//    uiGraphState.addToChangeOfContextTrapsSet2(changeOfContextTraps);
//  }
//
//
//  public static KWALIElementWrapper getKEWByXpath(Set<KWALIElementWrapper> kew_array, String xpath) {
//    for (KWALIElementWrapper kew : kew_array) {
//      if (kew.getXpath().equals(xpath)) {
//        return kew;
//      }
//    }
//    return null;
//  }
//
//  public static KWALIElementWrapper getKEWByIndex(Set<KWALIElementWrapper> kew_array, int index) {
//    for (KWALIElementWrapper kew : kew_array) {
//      if (kew.getThisElementIndex() == index) {
//        return kew;
//      }
//    }
//    return null;
//  }
//
//  // distinguish KEW that are radio buttons
//  public static Set<KWALIElementWrapper> getRadioButtonsKEWs(Set<KWALIElementWrapper> list) {
//    Set<KWALIElementWrapper> radiobuttons = new HashSet<>();
//
//    for (KWALIElementWrapper kew : list) {
//      if (kew.getElementType().equals("RadioInput")) {
//        radiobuttons.add(kew);
//      }
//    }
//    return radiobuttons;
//  }
//
//  public static void restoreRadioButtonsCheckState(WebDriver driver, Set<KWALIElementWrapper> list) {
//    // restore radio buttons to default page state
//    Utils.deselectAllRadioButtonsJS(driver);
//    // get radio button elements
//    for (KWALIElementWrapper kew_radiobtn : getRadioButtonsKEWs(list)) {
//      if (kew_radiobtn.isDefaultSelected()) {
//        Utils.checkElementWithJS(driver, kew_radiobtn.getWebElement());
//      }
//    }
//  }

  public static void deselectAllRadioButtonsJS(WebDriver driver) {
    String script = "var radios = document.getElementsByTagName('input');\n" + "    for (i = 0; i < radios.length; i++) {\n" + "        if (radios[i].type == 'radio') {\n" + "            radios[i].checked = false;\n" + "        }\n" + "    }";

    JavascriptExecutor js = (JavascriptExecutor) driver;
    js.executeScript(script);
  }

  public static void checkElementWithJS(WebDriver driver, WebElement element) {        // e.x:  tick radio btns or checkboxes
    String path = getAbsoluteXPath(driver, element);
    String script = "function getElementByXpath(path) {\n" + "  var elem = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;" + " elem.checked = true;" + "}" + "getElementByXpath(arguments[0])";
    ((RemoteWebDriver) driver).executeScript(script, path);
  }

  // utils used to run subjects - to read in csv subject list to run
  public static Map<String, String> readInCsvAsStringArray(String csvFilePath) {
    System.out.println("Utils csvFilePath: " + csvFilePath);
    HashMap<String, String> stringArray = new HashMap<>();
    // read-in subject data from csv
    try {
      Reader reader = Files.newBufferedReader(Paths.get(csvFilePath));
      CSVReader csvReader = new CSVReader(reader);

      // Reading Records One by One in a String array
      String[] nextRecord;
      int i = 0;
      while ((nextRecord = csvReader.readNext()) != null) {
        System.out.println("opa: "+nextRecord[0]+ " "+nextRecord[1]+" "+nextRecord[2]);
        if (i == 0) {
          i += 1;
          continue;
        }
        System.out.println("KWALIUtilis: " + nextRecord[2].trim() + " " + nextRecord[0].trim());
        stringArray.put(nextRecord[2].trim(), nextRecord[0].trim());
      }

    } catch (Exception e) {
      System.out.println("Utils: File Not Found: " + csvFilePath);
      return stringArray;
    }
    return stringArray;
  }

  public static List<String> readInCsvAsStringArraySingleColumn(String csvFilePath) {
    System.out.println("Utils csvFilePath: " + csvFilePath);
    List<String> stringArray = new ArrayList<>();
    // read-in subject data from csv
    try {
      Reader reader = Files.newBufferedReader(Paths.get(csvFilePath));
      CSVReader csvReader = new CSVReader(reader);

      // Reading Records One by One in a String array
      String[] nextRecord;
      while ((nextRecord = csvReader.readNext()) != null) {
        stringArray.add(nextRecord[0].trim());
      }
    } catch (Exception e) {
      System.out.println("Utils: File Not Found: " + csvFilePath);
      return stringArray;
    }
    return stringArray;
  }

  // write out css array
  public static void writeOutStringArrayAsCsv(String csvFilePath, HashMap<String, String> stringArray) {
    try {
      // make directories if not exist
      File csvFile = new File(csvFilePath);

      if (!csvFile.getParentFile().exists()) {
        csvFile.getParentFile().mkdirs();
      }
      // create FileWriter object with file as parameter
      FileWriter fw = new FileWriter(csvFile);

      // create CSVWriter object filewriter object as parameter
      CSVWriter writer = new CSVWriter(fw);

      for (String s : stringArray.keySet()) {
        String[] record = {s, stringArray.get(s)};
        writer.writeNext(record);
      }
      // closing writer connection
      writer.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public static void writeOutStringArrayAsCsvSingleColumn(String csvFilePath, List<String> stringArray) {
    try {
      // make directories if not exist
      File csvFile = new File(csvFilePath);

      if (!csvFile.getParentFile().exists()) {
        csvFile.getParentFile().mkdirs();
      }
      // create FileWriter object with file as parameter
      FileWriter fw = new FileWriter(csvFile);

      // create CSVWriter object filewriter object as parameter
      CSVWriter writer = new CSVWriter(fw);

      for (String s : stringArray) {
        String[] record = {s};
        writer.writeNext(record);
      }
      // closing writer connection
      writer.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }



  // get actual size of the viewport
  public static Pair<Integer, Integer> getActualViewportWindowSize(WebDriver refDriver) {
    JavascriptExecutor js = (JavascriptExecutor) refDriver;
    int contentWidth = ((Number) js.executeScript("return window.innerWidth")).intValue();
    int contentHeight = ((Number) js.executeScript("return window.innerHeight")).intValue();

    System.out.println("Utils: actual viewportSize is: " + contentWidth + " x " + contentHeight);
    return new Pair<Integer, Integer>(contentWidth, contentHeight);
  }

//  public static void saveBufferedImage(BufferedImage bi, String type, String path) {
//    NodesVisualRepBuilder.saveBufferedImage(bi, type, path);
//  }
//
//  public static void storeGraphDataAllEdgesToUIGraph(KDFG uiGraph, Set<KWALIEdge> edgeSetAll) {
//    for (KWALIEdge edge : edgeSetAll) {
//      ((KDFG) uiGraph).addAllEdgeToKDFG(edge);
//    }
//  }

  public static String normalizeXPATH(String xpath) {
    //remove /text() , /@placeholder , /@value , /descendant::text() from the xpath
    //currently not used in the normalization process
    //xpath = removeNonTagsFromXPATH(xpath);
    // add [1] before any '/'
    xpath = xpath.replaceAll("\\/", "[1]/");
    // remove [1] from the first '/' if it exist
    xpath = xpath.replaceAll("^\\[1\\]", "");
    //remove the added if there was an indexing used before
    xpath = xpath.replaceAll("\\]\\[1\\]", "]");
    //remove '/' from the end of the path
    if (xpath.endsWith("/")) xpath = xpath.substring(0, xpath.length() - 1);
    //if the xpath does not end with index add [1] to the end
    if (!xpath.endsWith("]")) xpath = xpath + "[1]";
    //if the xpath does not begin with '/' add it to the beginning
    if (!xpath.startsWith("/")) xpath = "/" + xpath;
    //change the xpath to lower case character
    return xpath.toLowerCase();

  }

  private static final String MBRS_JS_FUNTION_NAME = "computeVEs()";//"computeMBRs()";
  private static String mbrsExtractionsScript;

  public static String getMBRsExtractionScript() {
    if (mbrsExtractionsScript == null) {
      mbrsExtractionsScript = getJSScriptMBRsExtraction(MBRS_JS_FUNTION_NAME);
    }
    return mbrsExtractionsScript;
  }

  private static String getJSScriptMBRsExtraction(String functionName) {
    String jsScript = getPkgFileContents(Utils.class, "/getMBRs.js");
    jsScript += "\n" + "resultsJSON = " + functionName + ";";
    jsScript = compressJS(jsScript);  // MUST COMPRESS BEFORE RETURN STMT, otherwise the js code will not be valid
    jsScript += "\n" + "return resultsJSON;";
    return jsScript;
  }

  private static String compressJS(String jsString) {
    StringReader in = new StringReader(jsString);
    StringWriter out = new StringWriter();
    JavaScriptCompressor compressor;

    try {
      compressor = new JavaScriptCompressor(in, new ErrorReporter() {
        public void warning(String message, String sourceName, int line, String lineSource, int lineOffset) {
          System.err.println("\n[WARNING] in " + in);
          if (line < 0) {
            System.err.println("  " + message);
          } else {
            System.err.println("  " + line + ':' + lineOffset + ':' + message);
          }
        }

        public void error(String message, String sourceName, int line, String lineSource, int lineOffset) {
          System.err.println("Utils: [ERROR] in " + in);
          if (line < 0) {
            System.err.println("  " + message);
          } else {
            System.err.println("  " + line + ':' + lineOffset + ':' + message);
          }
        }

        public EvaluatorException runtimeError(String message, String sourceName, int line, String lineSource, int lineOffset) {
          this.error(message, sourceName, line, lineSource, lineOffset);
          return new EvaluatorException(message);
        }
      });
      compressor.compress(out, -1, true, false, false, false);
    } catch (IOException e) {
      e.printStackTrace();
    }

    if (out.toString().length() > 0) return out.toString();
    else return jsString;

  }

  public static String getElementStackingContextInfoWithJS(WebDriver driver, String path) {

    String script = "function zContext(path) {\n" + "	var props = {},\n" + "		//Also see: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context\n" + "		getClosestStackingContext = function( nodeOrObject ) {\n" + "			var node = nodeOrObject.node || nodeOrObject;\n" + "\n" + "			//the root element (HTML)\n" + "			if( ! node || node.nodeName === 'HTML' || node.nodeName === '#document-fragment' ) {\n" + "				return { node: document.documentElement, reason: 'root' };\n" + "			}\n" + "\n" + "			var computedStyle = getComputedStyle( node );\n" + "\n" + "			// position: fixed or sticky\n" + "			if ( computedStyle.position === 'fixed' || computedStyle.position === 'sticky' ) {\n" + "				return { node: node, reason: 'position: ' + computedStyle.position };\n" + "			}\n" + "\n" + "			// positioned (absolutely or relatively) with a z-index value other than \"auto\",\n" + "			if ( computedStyle.zIndex !== 'auto' && computedStyle.position !== 'static' ) {\n" + "				return { node: node, reason: 'position: ' + computedStyle.position + '; z-index: ' + computedStyle.zIndex };\n" + "			}\n" + "\n" + "			// elements with an opacity value less than 1.\n" + "			if ( computedStyle.opacity !== '1' ) {\n" + "				return { node: node, reason: 'opacity: ' + computedStyle.opacity };\n" + "			}\n" + "\n" + "			// elements with a transform value other than \"none\"\n" + "			if ( computedStyle.transform !== 'none' ) {\n" + "				return { node: node, reason: 'transform: ' + computedStyle.transform };\n" + "			}\n" + "\n" + "			// elements with a mix-blend-mode value other than \"normal\"\n" + "			if ( computedStyle.mixBlendMode !== 'normal' ) {\n" + "				return { node: node, reason: 'mixBlendMode: ' + computedStyle.mixBlendMode };\n" + "			}\n" + "\n" + "			// elements with a filter value other than \"none\"\n" + "			if ( computedStyle.filter !== 'none' ) {\n" + "				return { node: node, reason: 'filter: ' + computedStyle.filter };\n" + "			}\n" + "\n" + "			// elements with a perspective value other than \"none\"\n" + "			if ( computedStyle.perspective !== 'none' ) {\n" + "				return { node: node, reason: 'perspective: ' + computedStyle.perspective };\n" + "			}\n" + "\n" + "			// elements with isolation set to \"isolate\"\n" + "			if ( computedStyle.isolation === 'isolate' ) {\n" + "				return { node: node, reason: 'isolation: ' + computedStyle.isolation };\n" + "			}\n" + "\n" + "			// transform or opacity in will-change even if you don't specify values for these attributes directly\n" + "			if( computedStyle.willChange === 'transform' || computedStyle.willChange === 'opacity' ) {\n" + "				return { node: node, reason: 'willChange: ' + computedStyle.willChange };\n" + "			}\n" + "\n" + "			// elements with -webkit-overflow-scrolling set to \"touch\"\n" + "			if ( computedStyle.webkitOverflowScrolling === 'touch' ) {\n" + "				return { node: node, reason: '-webkit-overflow-scrolling: touch' };\n" + "			}\n" + "\n" + "			// a flex item with a z-index value other than \"auto\", that is the parent element display: flex|inline-flex,\n" + "			if ( computedStyle.zIndex !== 'auto' ) {\n" + "				var parentStyle = getComputedStyle( node.parentNode );\n" + "				if ( parentStyle.display === 'flex' || parentStyle.display === 'inline-flex' ) {\n" + "					return {\n" + "						node: node,\n" + "						reason: 'flex-item; z-index: ' + computedStyle.zIndex\n" + "					};\n" + "				}\n" + "			}\n" + "\n" + "			return getClosestStackingContext( { node: node.parentNode, reason: 'not a stacking context' } );\n" + "\n" + "		},\n" + "		shallowCopy = function( data ) {\n" + "			var props = Object.getOwnPropertyNames( data );\n" + "			var copy = { __proto__: null };\n" + "			for( var i = 0; i < props.length; ++i ) {\n" + "				copy[ props[ i ] ] = data[ props[ i ] ];\n" + "			}\n" + "			return copy;\n" + "		},\n" + "		generateSelector = function( element ) {\n" + "			var selector, tag = element.nodeName.toLowerCase();\n" + "			if( element.id ) {\n" + "				selector = '#' + element.getAttribute( 'id' );\n" + "			} else if( element.getAttribute( 'class' ) ) {\n" + "				selector = '.' + element.getAttribute( 'class' ).split( ' ' ).join( '.' );\n" + "			}\n" + "			return selector ? tag + selector : tag;\n" + "    };\n" + "  \n" + "  var $0 = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;" + "\n" + "	if( $0 && $0.nodeType === 1 ) {\n" + "		var closest = getClosestStackingContext( $0 );\n" + "		var createsStackingContext = $0 === closest.node;\n" + "		var reason = createsStackingContext ? closest.reason : 'not a stacking context';\n" + "		var parentContext = closest.node;\n" + "		var computedStyle = getComputedStyle( $0 );\n" + "		if ( createsStackingContext && $0.nodeName !== 'HTML' ) {\n" + "			parentContext = getClosestStackingContext( $0.parentNode ).node;\n" + "		}\n" + "		props = {\n" + "			current: generateSelector( $0 ),\n" + "			createsStackingContext: createsStackingContext,\n" + "			createsStackingContextReason: reason,\n" + "			parentStackingContext: generateSelector( parentContext ),\n" + "			'z-index': computedStyle.zIndex !== 'auto' ? parseInt( computedStyle.zIndex, 10 ) : computedStyle.zIndex\n" + "		};\n" + "	}\n" + "	return JSON.stringify(shallowCopy( props ));\n" + "}" + "return zContext(arguments[0])";
    String res = (String) ((RemoteWebDriver) driver).executeScript(script, path);
    return res;
  }

  public static String getFileNameFromURL(String url) {
    if (url.startsWith("file:/")) return url.substring(6);
    else {
      return url;
    }
  }

//  public static void drawNodeMBROnCanvas(Set<UIGraphNode> nodes, String color, String cornerInfoText) {
//    if (!Config.isToDrawOnCanvas()) {
//      return;
//    }
//    WebDriver knfgCanvasDriver = Utils.getBlankCanvas();
//    PageProcessor canvasPageProcessor = new PageProcessor(knfgCanvasDriver);
//    canvasPageProcessor.drawTextOverlay(cornerInfoText);
//
//    for (UIGraphNode node : nodes) {
//      double rect[] = {node.getX(), node.getY(), (node.getX() + node.getWidth()), (node.getY() + node.getHeight())};
//      canvasPageProcessor.drawMBR(rect, color, node.getXpath());
//      canvasPageProcessor.showCommentInPage();
//    }
//  }

//  public static WebDriver getBlankCanvas() {
//    WebDriver canvasDriver = getNewDriver();
//    URL canvaseURL = PageProcessor.class.getResource("/canvas.html");
//    canvasDriver.get(canvaseURL.toString());
//    return canvasDriver;
//  }

  public static Object ReadObjectFromFile(String filepath) {
    try {
      FileInputStream fileIn = new FileInputStream(filepath);
      ObjectInputStream objectIn = new ObjectInputStream(fileIn);

      Object obj = objectIn.readObject();

      objectIn.close();
      return obj;

    } catch (Exception ex) {
      ex.printStackTrace();
      return null;
    }
  }

  //kdf
  public static void WriteObjectToFile(Object serObj, String filepath) {
    try {
      FileOutputStream fileOut = new FileOutputStream(filepath);
      ObjectOutputStream objectOut = new ObjectOutputStream(fileOut);
      objectOut.writeObject(serObj);
      objectOut.close();

    } catch (Exception ex) {
      ex.printStackTrace();
    }
  }

//  public static DomNode getDomNodeByXpath(Set<DomNode> dom_array, String xpath) {
//    for (DomNode dn : dom_array) {
//      if (dn.getXPath().equals(xpath)) {
//        return dn;
//      }
//    }
//    return null;
//  }
//
//  public static void drawDomNodeMBROnCanvas(Set<DomNode> nodes, String color, String cornerInfoText) {
//    if (!Config.isToDrawOnCanvas()) {
//      return;
//    }
//    WebDriver knfgCanvasDriver = Utils.getBlankCanvas();
//    PageProcessor canvasPageProcessor = new PageProcessor(knfgCanvasDriver);
//    canvasPageProcessor.drawTextOverlay(cornerInfoText);
//
//    for (DomNode node : nodes) {
//      double rect[] = {node.getX1(), node.getY1(), node.getX2(), node.getY2()};
//      canvasPageProcessor.drawMBR(rect, color, node.getXPath());
//      canvasPageProcessor.showCommentInPage();
//    }
//  }
//
//  public static void storeGraphDataInDialogToUIGraph(KDFG uiGraph, Set<KWALIElementWrapper> ctrlElemsInDialog) {
//    for (KWALIElementWrapper kew : ctrlElemsInDialog) {
//      uiGraph.addNodeToCtrlElemsInDialog(kew);
//    }
//  }

  public static Object executeScript(WebDriver driver, String script, WebElement webElement) {
    if (Config.browserType.equals("chrome")) {
      return ((ChromeDriver) driver).executeScript(script, webElement);
    } else if (Config.browserType.equals("safari")) {
      return ((SafariDriver) driver).executeScript(script, webElement);
    } else if (Config.browserType.equals("edge")) {
      return ((EdgeDriver) driver).executeScript(script, webElement);
    } else { // firefox
      return ((FirefoxDriver) driver).executeScript(script, webElement);
    }
  }

  public static Object executeScript(WebDriver driver, String script) {
    if (Config.browserType.equals("chrome")) {
      return ((ChromeDriver) driver).executeScript(script);
    } else if (Config.browserType.equals("safari")) {
      return ((SafariDriver) driver).executeScript(script);
    } else if (Config.browserType.equals("edge")) {
      return ((EdgeDriver) driver).executeScript(script);
    } else {
      return ((FirefoxDriver) driver).executeScript(script);
    }
  }
}
