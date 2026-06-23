package edu.usc.sql.krawler.buildedges.interstate.threads;

import edu.usc.sql.krawler.buildedges.CrawlAction;
import edu.usc.sql.krawler.buildedges.interstate.CrawlActionMutationResult;
import lombok.Getter;
import org.openqa.selenium.WebDriver;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;


public class CrawlActionProcessorPool {
  @Getter
  String url;
  @Getter
  int proxyPort;


  public Set<CrawlAction> actionsToCrawl;
  @Getter
  public Set<CrawlActionMutationResult> crawlActionMutationResults;
  int numberOfConcurrentThreads;

  // tracking instantiated web drivers
  public List<WebDriver> inducedWebDrivers;
  @Getter
  boolean finishedProcessing = false;

//  protected String screenModalityType;
//  protected int viewPort_x;
//  protected int viewPort_y;
//  protected int zoomPercentage;


  protected ExecutorService executor;
  protected ArrayList<Future<?>> futures;


  public void addToCrawlActionMutationResult(CrawlActionMutationResult crawlActionMutationResult){
      crawlActionMutationResults.add(crawlActionMutationResult);
  }


  public CrawlActionProcessorPool(Set actionsToCrawl, int numberOfConcurrentThreads, String url, int proxyPort) {
    this.actionsToCrawl = actionsToCrawl;
    this.crawlActionMutationResults = new HashSet<>();

    this.numberOfConcurrentThreads = numberOfConcurrentThreads;

    this.inducedWebDrivers = new ArrayList<>();

    this.url = url;
    this.proxyPort = proxyPort;
  }

  public void initializeExecutorServices() {
    futures = new ArrayList<>();
    executor = Executors.newFixedThreadPool(numberOfConcurrentThreads);        // create new executor
//    Config.addToFuturesList(futures);
  }

  public void handleShuttingDownWebDrivers() {
    for (WebDriver driver : inducedWebDrivers) {
      try {
        System.out.println("FindDeeperPool: Quitting web driver...");
        driver.quit();
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }

  public void addToInducedWebDrivers(WebDriver driver) {
    this.inducedWebDrivers.add(driver);
  }


  public void start() {
    // list to track threading
    initializeExecutorServices();

//    Config.addToFuturesList(futures);
    for (CrawlAction ca : actionsToCrawl) {
      Runnable worker = new CrawlActionProcessor(ca, this);
      Future<?> f = executor.submit(worker);
      futures.add(f);
    }

    executor.shutdown();
    while (!executor.isTerminated()) {
    }
    finishedProcessing = true;
    System.out.println("CrawlAction: Finished all threads");

    // make sure all web drivers are terminated
    handleShuttingDownWebDrivers();
  }



}