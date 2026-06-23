package edu.usc.sql.krawler.webproxy;

import java.util.List;
import java.util.Properties;

import edu.usc.sql.krawler.utilities.Config;
import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

import edu.usc.sql.krawler.utilities.Utils;

@Getter
@Setter
public class GetTestSubjects {

  WebDriver refDriver;
  String subjectName;
  String url;
  int proxyPort;
  boolean injection;
  Subject subject;

  public GetTestSubjects(String id, int proxyPort, boolean injection) {
    System.out.println("GetTestSubjects");
    System.out.println(id);
    System.out.println(proxyPort);

    this.proxyPort = proxyPort;
    this.injection = injection;

    try {
      List<Subject> subjects = Config.getSubjects();

      for (Subject s : subjects) {
        if (s.getSubject().equals(id)) {
          this.subject = s;
          this.subjectName = id;
          break;
        }
      }

      if (id.startsWith("http")) {
        this.url = id;
        System.out.println("GetTestSubjects url: " + url);

        this.refDriver = Utils.getNewDriverWithProxy(proxyPort);

        if (Config.browserType.equals("safari")) {
          ((JavascriptExecutor) refDriver).executeScript(
                  "safari.network.proxy = { mode: 'manual', http: '"
                          + this.proxyPort
                          + "', https: '"
                          + this.proxyPort
                          + "' };"
          );
        }

        refDriver.get(url);

      } else {
        if (this.subject == null) {
          throw new IllegalArgumentException("Unknown subject id: " + id);
        }

        this.url = subject.getUrl();
        System.out.println("local accessed website: GetTestSubjects url: " + url);

        this.refDriver = Utils.getNewDriverWithProxy(proxyPort);

        if (Config.browserType.equals("safari")) {
          setProxy(this.url, "localhost:" + proxyPort);
        }

        refDriver.get(url);
      }

    } catch (RuntimeException e) {
      safeShutdownWebDriver();
      throw e;

    } catch (Exception e) {
      safeShutdownWebDriver();
      throw new RuntimeException("Failed to initialize GetTestSubjects for: " + id, e);
    }
  }

  private static void setProxy(String propertyName, String propertyValue) {
    Properties systemProperties = System.getProperties();
    systemProperties.setProperty(propertyName, propertyValue);
  }

  public void shutdownWebDriver() {
    safeShutdownWebDriver();
  }

  private void safeShutdownWebDriver() {
    if (refDriver == null) {
      return;
    }

    try {
      refDriver.quit();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      refDriver = null;
    }
  }
}