package edu.usc.sql.krawler.utilities;

import lombok.Getter;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;


@Getter
public class ReadConfigInfo {


  private static ReadConfigInfo instance = new ReadConfigInfo();
  private HashMap<String, String> runConfiguration = new HashMap<>();

  private ReadConfigInfo() {
    readConfigFile();
  }

  public static ReadConfigInfo getInstance() {
    if (instance == null) {
      instance = new ReadConfigInfo();

    }
    return instance;
  }

  public void readConfigFile() {
    try (BufferedReader br = new BufferedReader(new FileReader("run_config"))) {
      String line;
      while ((line = br.readLine()) != null) {
        if (line.contains("===")) {
          String[] l = line.trim().split("===");
          if(l.length == 1){
            getRunConfiguration().put(l[0], "");
            continue;
          }
          try {
            getRunConfiguration().put(l[0].replace("\uFEFF", ""), l[1].replace("\uFEFF", ""));
          } catch (Exception e) {
            e.printStackTrace();
            getRunConfiguration().put(l[0], "");
          }
        }

      }
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public static void main(String[] args) {
    HashMap<String, String> xpath = ReadConfigInfo.getInstance().getRunConfiguration();
    System.out.println("ReadConfigInfo: xpath" + xpath);
  }

}




