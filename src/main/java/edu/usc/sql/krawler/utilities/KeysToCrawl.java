package edu.usc.sql.krawler.utilities;

import lombok.Getter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class KeysToCrawl {

    public static String[] navKeysTabs = {"TAB", "SHIFTTAB"};
    public static String[] navKeysArrows = {"UP", "DOWN", "LEFT", "RIGHT"};
    public static String[] actuationKeys = {"SPACE"};
    public static String[] dismissKeys = {"ESCAPE"};

    public static String[] getNavKeysArrowsAndActuationKeys() {
        List<String> allKeysToCrawl = new ArrayList<>();
        allKeysToCrawl.addAll(Arrays.asList(KeysToCrawl.navKeysArrows));
        allKeysToCrawl.addAll(Arrays.asList(KeysToCrawl.actuationKeys));
        return allKeysToCrawl.toArray(new String[0]);
    }

    public static String[] navKeysTabOnly = {"TAB"};
    public static String[] navKeysShiftTabOnly = {"SHIFTTAB"};
}
