package edu.usc.sql.krawler.utilities;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class WriteToFile {

  String path;

  public WriteToFile(String s) {
    this.path = s;
  }

  public void write(String str1) {
    try {
      String stringToWrite = str1 + "\n";
      File newTextFile = new File(path);

      if (!newTextFile.getParentFile().exists()) {
        newTextFile.getParentFile().mkdirs();
      }

      if (!newTextFile.exists()) {
        newTextFile.createNewFile();
      }

      FileWriter fw = new FileWriter(newTextFile, false);
      fw.write(stringToWrite);
      fw.close();

    } catch (IOException iox) {
      //do stuff with exception
      iox.printStackTrace();
    }
  }

  public void write(String str1, boolean append) {
    // TODO Auto-generated constructor stub
    try {
      String stringToWrite = str1 + "\n";
      File newTextFile = new File(path);

      if (!newTextFile.getParentFile().exists()) {
        //System.out.println( "a" );
        newTextFile.getParentFile().mkdirs();
      }

      if (!newTextFile.exists()) {
        //System.out.println( "b" );
        newTextFile.createNewFile();
      }

      //System.out.println( "Hello World!" );
      FileWriter fw = new FileWriter(newTextFile, append);
      fw.write(stringToWrite);
      fw.close();

    } catch (IOException iox) {
      //do stuff with exception
      iox.printStackTrace();
    }
  }

  public void write(List<String> strArr1) {
    try {
      File newTextFile = new File(path);

      if (!newTextFile.getParentFile().exists()) {
        newTextFile.getParentFile().mkdirs();
      }

      if (!newTextFile.exists()) {
        newTextFile.createNewFile();
      }

      FileWriter fw = new FileWriter(newTextFile, false);
      for (String s : strArr1) {
        fw.write(s + "\n");
      }
      fw.close();

    } catch (IOException iox) {
      //do stuff with exception
      iox.printStackTrace();
    }
  }

  public void write(List<String> strArr1, boolean append) {
    // TODO Auto-generated constructor stub
    try {
//            String stringToWrite = str1 + "\n";
      File newTextFile = new File(path);

      if (!newTextFile.getParentFile().exists()) {
        //System.out.println( "a" );
        newTextFile.getParentFile().mkdirs();
      }

      if (!newTextFile.exists()) {
        //System.out.println( "b" );
        newTextFile.createNewFile();
      }

      //System.out.println( "Hello World!" );
      FileWriter fw = new FileWriter(newTextFile, append);
      for(String s:strArr1) {
        fw.write(s + "\n");
      }
      fw.close();

    } catch (IOException iox) {
      //do stuff with exception
      iox.printStackTrace();
    }
  }
}