package edu.usc.sql.krawler.utilities;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.Future;

import edu.usc.sql.krawler.misc.LoadCsvFromGoogleSheetJava;
import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.WebDriver;

import com.opencsv.CSVReader;

import edu.usc.sql.krawler.misc.LoadCsvFromGoogleSheet;
import edu.usc.sql.krawler.webproxy.MitmproxyJava;
import edu.usc.sql.krawler.webproxy.Subject;

public class Config {


  // path to output project models/detections/results outputs
  public static String projectOutputDir = ReadConfigInfo.getInstance().getRunConfiguration().get("project_output_dir");

  @Getter
  public static double mergingFunctionalityThreshold = 0.98;

  @Getter
  public static String basepath = projectOutputDir + File.separator + File.separator;

  // output main directory
  @Getter
  public static String outputBasepath = basepath + "output" + File.separator;
  @Getter
  public static Boolean headlessMode = ReadConfigInfo.getInstance().getRunConfiguration().get("headless_mode").equals("true");
  public static String runCacheName = ReadConfigInfo.getInstance().getRunConfiguration().get("run_cached_name");
  public static String browserType = ReadConfigInfo.getInstance().getRunConfiguration().get("browser_type");
  public static String mitmproxyFolderName = ReadConfigInfo.getInstance().getRunConfiguration().get("mitmproxy_folder_name");


  public static final int numOfConcurrentWebdrivers = Integer.parseInt(ReadConfigInfo.getInstance().getRunConfiguration().get("num_of_concurrent_webdrivers"));


  public static String runSubjectName = ReadConfigInfo.getInstance().getRunConfiguration().get("run_single_subject");
  public static String listOfSubjectsToRun = ReadConfigInfo.getInstance().getRunConfiguration().get("list_of_subjects_to_run");
  public static String runSubjectNameLoadSubjects = ReadConfigInfo.getInstance().getRunConfiguration().get("run_single_subject_load_subjects");
  public static String listOfSubjectsAlreadyRan = ReadConfigInfo.getInstance().getRunConfiguration().get("list_of_subjects_alreaddy_ran");
  @Getter @Setter
  public static String cachedSubjectBasepath = ReadConfigInfo.getInstance().getRunConfiguration().get("cached_subjects_location");
  public static String urlToSubjectMappingGoogleSheet = ReadConfigInfo.getInstance().getRunConfiguration().get("url_to_main_subject_mapping_google_sheet");
  public static String subjectMappingGoogleSheetLocalCsvOutput = ReadConfigInfo.getInstance().getRunConfiguration().get("main_subject_mapping_google_sheet_local_output");
  public static String subjectMappingCsv = ReadConfigInfo.getInstance().getRunConfiguration().get("subject_mapping_csv");


//  public static String saveCachedWebsitesPath = ReadConfigInfo.getInstance().getRunConfiguration().get("save_cached_websites_path");
//  public static String cachedSubjectJunkBasepath = ReadConfigInfo.getInstance().getRunConfiguration().get("cached_subjects_location_junk");
//  // url to main subject info google sheet
//  @Getter
//  public static String urlToMainSubjectToCache = ReadConfigInfo.getInstance().getRunConfiguration().get("url_to_main_subjects_to_cache_mapping");
//  public static String subjectMappingCsvOutput = ReadConfigInfo.getInstance().getRunConfiguration().get("subject_mapping_csv_output");
//  public static String urlToMainSubjectJunkMappingGoogleSheet = ReadConfigInfo.getInstance().getRunConfiguration().get("url_to_main_subject_mapping_junk");
//  public static String subjectJunkMappingCsvOutput = ReadConfigInfo.getInstance().getRunConfiguration().get("subject_mapping_csv_output_junk");



  public static String resourcesDirectory = new File("src/main/resources").getAbsolutePath();

    // mitmproxy setup location
  public static String mitmProxy530Basepath = resourcesDirectory + File.separator + mitmproxyFolderName;
  @Getter
  public static List<Subject> subjects = new ArrayList<>();
  // get change-of-context traps
  // nav away keyboard trap
  @Getter
//  public static Set<Pair<KWALIElementWrapper, String>> pageNavigationTrapElementsXpath = new HashSet<>(); // for change-of-context traps
  public final static String v_exit_nameStringInKNFG = "v_exit";
  // seconds delay during crawling
  public static final double extraSecondsAfterWaitForPageLoad = 4;                            // extra wait after page load (modified from 1 to 2 due to samsclub floater modal trigger)
  // knf
  public static final double edgeExploringThreadsInsideDialogKFFGSecondsDelayCrawlToState = 2.5;        // crawl to current state before trigger
  public static final double edgeExploringThreadsInsideDialogKFFGSecondsDelayAfterTrigger = 2.5;
  public static final double secondsDelayAfterTriggerInFindDeeper = 2.5;
  // uigraph state phase ids
  public static final String CRAWLING_PHASE = "CRAWLING_PHASE";
  public static final String INITIAL_PHASE = "INITIAL_PHASE";
  //  screen modality types
  public static final String VIEWPORT = "VIEWPORT";
  // states of mutation observed actions
//  public static Queue<StateToExplore> stateToExploreQueue = new LinkedList<>();
  public static List<ArrayList<Future<?>>> futuresList = new ArrayList<>();
  @Getter
  public static int numOfFinishedStateCrawingThreadsBatches = 0;
  public static boolean isOnlyProcessInitialState_KDF = false;
  // this is used to determine element screenshots were only captured once
  public static Set<String> seenScreenshotElementInCurrentSubject = new HashSet<>();
  @Getter
  public static boolean toDrawOnCanvas;            // global variable to
  @Getter
  public static int proxyPort = 9998;        // starting base port #
  public static synchronized int getNextProxyPort() {
    return proxyPort++;
  }

  // keeping track of web driver and mitmproxy resources in current session
  public static List<WebDriver> driverResourceList = new ArrayList<>();
  public static List<MitmproxyJava> mitmProxyResourceList = new ArrayList<>();
  ////////// universal state id for current session knfg
  public static int universalStateIDForCurrentSession = 0;
  public static Map<List<String>, Integer> visibleDomCtrlElemsXpathsUniversalStateIDMap = new HashMap<>();
  public static final double stateCrawingThreadsKNFGSecondsDelayAfterTrigger = 2.5;
  public static int delayToCapturePostDialogTriggerDom = 5;  // need this delay to let the dialog transition settle
  // KDF dialog transition types
  public static final String MODAL_INSERTED = "MODAL_INSERTED";
  public static final String MODAL_REMOVED = "MODAL_REMOVED";
  public static final String MODAL_SWITCH_MODAL = "MODAL_SWITCH_MODAL";
  public static final String MODELESS_INSERTED = "MODELESS_INSERTED";
  public static final String MODELESS_REMOVED = "MODELESS_REMOVED";
  public static final String NODIALOG = "NODIALOG";


  public static String firefox_driver_location = ReadConfigInfo.getInstance().getRunConfiguration().get("firefox_driver_location");


  public static String geckoDriverLocation = resourcesDirectory + File.separator + "SeleniumGecko/geckodriver2";
  public static String firefoxDriverLocation92 = firefox_driver_location + "firefox/firefox92.0/firefox";

  // web driver configurations
  public static void applyConfig(){
    setFirefoxDriverLocation();
    setGeckoDriverLocation();
  }
  private static void setGeckoDriverLocation() {
    if(new File(geckoDriverLocation).exists()){
      System.out.println("gecko location: "+geckoDriverLocation);
      System.setProperty("webdriver.gecko.driver",geckoDriverLocation);
    }
  }
  private static void setFirefoxDriverLocation() {
    String firefoxDriverLocation = firefoxDriverLocation92;

    if(new File(firefoxDriverLocation).exists()){
      System.out.println("firefox location: "+firefoxDriverLocation);
      System.setProperty("webdriver.firefox.bin",firefoxDriverLocation);
    }
  }

//  // directory where the cached subject web pages are stored
//  public static String getCachedSubjectPath() {
//    if (cachedSubjectBasepath.equals("")) {
//      return resourcesDirectory + File.separator + "cachedSubjects" + File.separator;
//    } else {
//      if (isUseCachedJunkString.equalsIgnoreCase("yes")) {
//        return cachedSubjectJunkBasepath;
//      } else {
//        return cachedSubjectBasepath;
//      }
//    }
//  }
//
//  public static String getUrlToMainSubjectMapping() {
//    if (subjectMappingCsvOutput.equals("")) {
//      return resourcesDirectory + File.separator + "subjects-output.csv";
//    } else {
//      if (isUseCachedJunkString.equalsIgnoreCase("yes")) {
//        return urlToMainSubjectJunkMappingGoogleSheet;
//      } else {
//        return urlToMainSubjectToCache;
//      }
//    }
//  }
//
//  public static String getSubjectMappingCsvOutput() {
//    if (subjectMappingCsvOutput.equals("")) {
//      return resourcesDirectory + File.separator + "subjects-output.csv";
//    } else {
//      if (isUseCachedJunkString.equalsIgnoreCase("yes")) {
//        return subjectJunkMappingCsvOutput;
//      } else {
//        return subjectMappingCsvOutput;
//      }
//    }
//  }


  /////// KAF
  // KAFE output directory per subject
  public static String getSubjectOutputDir() {
    return outputBasepath + runSubjectName + File.separator;
  }



  // general directory
  public static String getOutputBaseDir() {
    return outputBasepath;
  }



  public static String getMitmProxyBasepath() {
    return mitmProxy530Basepath;
  }


  public static void resetNumOfFinishedStateCrawingThreadsBatches() {
    numOfFinishedStateCrawingThreadsBatches = 0;
  }


  public static void resetUniversalStateIDForCurrentSession() {
    universalStateIDForCurrentSession = 0;
  }

  public static void resetVisibleDomCtrlElemsXpathsUniversalStateIDMap() {
    visibleDomCtrlElemsXpathsUniversalStateIDMap = new HashMap<>();
  }


  public static void resetProxyPortCount() {
    proxyPort = 9998;
  }

  // teardown drivers
  public static void addToDriverResourceList(WebDriver driver) {
    Config.driverResourceList.add(driver);
  }

  public static void resetDriverResourceList() {
    Config.driverResourceList = new ArrayList<>();
  }

  public static void shutdownAllDrivers() {
    for (WebDriver driver : Config.driverResourceList) {
      try {
        driver.quit();
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    Config.resetDriverResourceList();
  }

  // teardown mitmproxies
  public static void resetMitmProxyResourceList() {
    Config.mitmProxyResourceList = new ArrayList<>();
  }

  public static void shutdownAllMitmProxies() {
    for (MitmproxyJava proxy : Config.mitmProxyResourceList) {
      try {
        proxy.stop();
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    Config.resetMitmProxyResourceList();
  }

  public static void setToDrawOnCanvas(boolean toDrawOnCanvas) {
    Config.toDrawOnCanvas = toDrawOnCanvas;
  }

  // detect navigation away traps
//  public static void addToPageNavigationTrapElementsXpath(Pair<KWALIElementWrapper, String> xpathKeystrokePair) { // storing change-of-context traps
//    pageNavigationTrapElementsXpath.add(xpathKeystrokePair);
//  }

  // states of mutation observed actions
//  public static void addToStateToExploreQueue(StateToExplore state) {
//    stateToExploreQueue.add(state);
//  }
//
//  public static void resetStateToExploreQueue() {
//    stateToExploreQueue = new LinkedList<>();
//  }


  public static void addToFuturesList(ArrayList<Future<?>> futures) {
    Config.futuresList.add(futures);
  }

  public static void resetFuturesList() {
    futuresList = new ArrayList<>();
  }


  // already explored mo action pairs NEWLY REFINED FOR KFFG
  ////////////////////////////////// KDF revised approach ////////////////////////////////////
  // already explored input-based dom states 2
  public static void resetExploredInputBasedDOMStateSet2() {
  }

  //// graph
  public static void addToSubjects(Subject subj) {
    Config.subjects.add(subj);
  }



  public static void saveSubjectMappingFromGoogleSheetToLocal(){
    //LoadCsvFromGoogleSheet.load(urlToSubjectMappingGoogleSheet, subjectMappingGoogleSheetLocalCsvOutput);
    LoadCsvFromGoogleSheetJava.load(urlToSubjectMappingGoogleSheet, subjectMappingGoogleSheetLocalCsvOutput);
  }

  public static List<String> prepareSubjectsToRun(String listOfSubjectsToRunCsv, String listOfSubjectsAlreadyRanCsv) {
    List<String> subjectsToRunArray = new ArrayList<>();
    if(!runSubjectName.equals("")){
      subjectsToRunArray.add(runSubjectName);
    } else {
      List<String> list_to_run = Utils.readInCsvAsStringArraySingleColumn(listOfSubjectsToRunCsv);
      subjectsToRunArray.addAll(list_to_run);

      // remove already finished processing subjects
      String dir = listOfSubjectsAlreadyRanCsv;//= Config.getOutputBaseDir() + File.separator + "KRF" + File.separator + "successfullyProcessedApproach.csv";
      Set<String> finishedProcessedSubjects = new HashSet<>(Utils.readInCsvAsStringArraySingleColumn(dir));
      subjectsToRunArray.removeAll(finishedProcessedSubjects);
    }
    return subjectsToRunArray;
  }

  public static void addSubjectsObjects() {
//    String outputCsvFileFullPath;
//    if (csvUrl == null) {
//      outputCsvFileFullPath = getSubjectMappingCsvOutput();
//    } else {
//      outputCsvFileFullPath = csvUrl;
//    }
//    System.out.println("outputCsvFileFullPath: " + outputCsvFileFullPath);

    try {
      Reader reader = Files.newBufferedReader(Paths.get(subjectMappingCsv));
      CSVReader csvReader = new CSVReader(reader);

      // Reading Records One by One in a String array
      String[] nextRecord;
      while ((nextRecord = csvReader.readNext()) != null) {
        String id = new String(nextRecord[0].trim().replace("\uFEFF", ""));
        String url = nextRecord[1];
        boolean isProxy = nextRecord[1].trim().replace("\uFEFF", "").equals("local") ? false : true;
        Subject newSubject = new Subject(id, url, isProxy);
        Config.addToSubjects(newSubject);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }

  }


  public static String getSubjectOutputDirKDF() {
    return outputBasepath + runSubjectName + File.separator;
  }

  public static String getSubjectCsvSuccessfullyProcessed_runApproach_KDF() {
    return outputBasepath + "successfullyProcessedApproach.csv";
  }

  // tracking same dialog but from different triggers (for kffg/knf)
  public static List<Pair<String, Integer>> exploredTriggerDialogStatePairs = new ArrayList<>();

  public static String subjectMappingCsvOutput = ReadConfigInfo.getInstance().getRunConfiguration().get("subject_mapping_csv_output");
  public static String isUseCachedJunkString = ReadConfigInfo.getInstance().getRunConfiguration().get("use_cached_junk_yes_or_no");
  public static String subjectJunkMappingCsvOutput = ReadConfigInfo.getInstance().getRunConfiguration().get("subject_mapping_csv_output_junk");
  public static String urlToMainSubjectJunkMappingGoogleSheet = ReadConfigInfo.getInstance().getRunConfiguration().get("url_to_main_subject_mapping_junk");
  public static String urlToMainSubjectToCache = ReadConfigInfo.getInstance().getRunConfiguration().get("url_to_main_subjects_to_cache_mapping");


  public static String getSubjectMappingCsvOutput() {
    if (subjectMappingCsvOutput.equals("")) {
      return resourcesDirectory + File.separator + "subjects-output.csv";
    } else {
      if (isUseCachedJunkString.equalsIgnoreCase("yes")) {
        return subjectJunkMappingCsvOutput;
      } else {
        return subjectMappingCsvOutput;
      }
    }
  }

  public static String getUrlToMainSubjectMapping() {
    if (subjectMappingCsvOutput.equals("")) {
      return resourcesDirectory + File.separator + "subjects-output.csv";
    } else {
      if (isUseCachedJunkString.equalsIgnoreCase("yes")) {
        return urlToMainSubjectJunkMappingGoogleSheet;
      } else {
        return urlToMainSubjectToCache;
      }
    }
  }


  public static void addAllTestSubjects(String csvUrl) {
    String outputCsvFileFullPath;
    if (csvUrl == null) {
      outputCsvFileFullPath = getSubjectMappingCsvOutput();
    } else {
      outputCsvFileFullPath = csvUrl;
    }
    System.out.println("outputCsvFileFullPath: " + outputCsvFileFullPath);

    LoadCsvFromGoogleSheet.load(getUrlToMainSubjectMapping(), outputCsvFileFullPath);

    try {
      Reader reader = Files.newBufferedReader(Paths.get(outputCsvFileFullPath));
      CSVReader csvReader = new CSVReader(reader);

      // Reading Records One by One in a String array
      String[] nextRecord;
      while ((nextRecord = csvReader.readNext()) != null) {
        String id = new String(nextRecord[0].trim().replace("\uFEFF", ""));
        String url = nextRecord[1];
        boolean isProxy = nextRecord[1].trim().replace("\uFEFF", "").equals("local") ? false : true;
        Subject newSubject = new Subject(id, url, isProxy);
        Config.addToSubjects(newSubject);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }

  }
}