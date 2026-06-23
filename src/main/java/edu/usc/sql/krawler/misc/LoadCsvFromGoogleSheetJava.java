package edu.usc.sql.krawler.misc;

import java.io.*;
import java.net.URL;

public class LoadCsvFromGoogleSheetJava {

    public static void load(String inputGoogleSheetSubjectMappingUrl, String outputCsvFileFullPath) {
        try {
            String url = inputGoogleSheetSubjectMappingUrl;
            String fileName = outputCsvFileFullPath;
            URL urlink = new URL(url);
            URLDnldFile(urlink, fileName);
            System.out.println("Google Sheet CSV mapping downloaded successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void URLDnldFile(URL urlink, String fileName) throws IOException{
        try (InputStream inp = urlink.openStream();
             BufferedInputStream bis = new BufferedInputStream(inp);
             FileOutputStream fops = new FileOutputStream(fileName)){
            byte[] d = new byte[1024];
            int i;
            while ((i = bis.read(d, 0, 1024)) != -1){
                fops.write(d, 0, i);
            }
        }
    }

    public static void main(String[] args) {


//        try {
//            String url = Config.urlToSubjectMappingGoogleSheet;//"https://example.com/somefile.txt"; // Replace with a valid URL
//            String fileName = Config.subjectMappingGoogleSheetLocalCsvOutput ;//"downloaded_file.txt"; // Specify the desired file name
//            URL urlink = new URL(url);
//            URLDnldFile(urlink, fileName);
//            System.out.println("File downloaded successfully?");
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

    }

}
