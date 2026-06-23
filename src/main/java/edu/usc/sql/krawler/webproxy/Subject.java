package edu.usc.sql.krawler.webproxy;

import java.io.File;

import edu.usc.sql.krawler.utilities.Config;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Subject {

  private String subject;
  private String url;
  private String localUrl;
  private String refProxyCacheFile;
  private boolean isProxySubject;

  public Subject(String subject, String url, boolean isProxySubject) {
    this.subject = subject;
    this.isProxySubject = isProxySubject;
    if (isProxySubject) {
      this.refProxyCacheFile = Config.cachedSubjectBasepath + File.separatorChar + subject;
      this.url = url;
    } else {
      this.localUrl = "file://" + Config.cachedSubjectBasepath + subject + File.separatorChar + "index.html";
    }
  }

}
