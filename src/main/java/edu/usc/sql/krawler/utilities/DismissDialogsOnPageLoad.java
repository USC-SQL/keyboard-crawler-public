package edu.usc.sql.krawler.utilities;

import com.opencsv.CSVReader;
import edu.usc.sql.krawler.misc.LoadCsvFromGoogleSheetJava;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DismissDialogsOnPageLoad {

    public static Map<String, List<String>> readInDialogTriggersForSubject(String googleSheetLocation, String googleSheetLocalOutputLocation) {

        LoadCsvFromGoogleSheetJava.load(googleSheetLocation, googleSheetLocalOutputLocation);

        Map<String, List<String>> subjectAndTriggerMapping = new HashMap<String, List<String>>();

        try {
            Reader reader = Files.newBufferedReader(Paths.get(googleSheetLocalOutputLocation));
            CSVReader csvReader = new CSVReader(reader);

            // Reading Records One by One in a String array
            String[] nextRecord;
            while ((nextRecord = csvReader.readNext()) != null) {
                String id = nextRecord[0].trim().replace("\uFEFF", "");
                List<String> triggersXpaths = new ArrayList<>();
                String trigger1 = nextRecord[1].trim().replace("\uFEFF", "");
                String trigger2 = nextRecord[2].trim().replace("\uFEFF", "");
                String trigger3 = nextRecord[3].trim().replace("\uFEFF", "");
                String trigger4 = nextRecord[4].trim().replace("\uFEFF", "");
                triggersXpaths.add(trigger1);
                triggersXpaths.add(trigger2);
                triggersXpaths.add(trigger3);
                triggersXpaths.add(trigger4);

                subjectAndTriggerMapping.put(id, triggersXpaths);

            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return  subjectAndTriggerMapping;
    }


    public static void dismiss(WebDriver refDriver, List<String> xpathsOfDialogTriggers){
        if(xpathsOfDialogTriggers == null) {
            return;
        }
        for(String xpathOfTrigger:xpathsOfDialogTriggers){
            try {
                WebElement trigger = refDriver.findElement(By.xpath(xpathOfTrigger));
                trigger.click();
                System.out.println("Activated dialog dismiss trigger: "+xpathOfTrigger);
            } catch (Exception e) {
                e.printStackTrace();
            }

            Utils.waitForResourceLoad(1.5);
        }
    }



//    public static void dismissDialogs(String subjectName){
//        Map<String, List<String>> subjectAndTriggerMapping = DismissDialogsOnPageLoad.readInDialogTriggersForSubject(googleSheetLocation, googleSheetLocalOutputLocation);
//        List<String> dialogDismissTriggersForSubject = subjectAndTriggerMapping.get(SUBJECT_NAME);
//        DismissDialogsOnPageLoad.dismiss(dialogDismissTriggersForSubject);
//
//    }
}
