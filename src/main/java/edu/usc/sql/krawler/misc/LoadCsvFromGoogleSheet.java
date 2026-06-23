package edu.usc.sql.krawler.misc;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

import edu.usc.sql.krawler.utilities.Config;


public class LoadCsvFromGoogleSheet {

  public static void load(String inputGoogleSheetSubjectMappingUrl, String outputCsvFileFullPath) {

    ////// load mapping from google sheet and save to csv file
    // begin new process
    ProcessBuilder pb = new ProcessBuilder();
    // define a shell command
    System.out.println("python3 "+ Config.resourcesDirectory + File.separator + " loadSubjectMapFromGoogleSheet.py "+ outputCsvFileFullPath +" "+ inputGoogleSheetSubjectMappingUrl);
    pb.command("python3", Config.resourcesDirectory + File.separator + "loadSubjectMapFromGoogleSheet.py", outputCsvFileFullPath, inputGoogleSheetSubjectMappingUrl);
    System.out.print("HELLO: "+"python3 "+ Config.resourcesDirectory + File.separator + "loadSubjectMapFromGoogleSheet.py "+ outputCsvFileFullPath+" "+ inputGoogleSheetSubjectMappingUrl);
    try {
      Process process = pb.start();        // execute
      // capture resulting console output
      BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
    } catch (IOException e1) {
      e1.printStackTrace();
    }

  }
}
