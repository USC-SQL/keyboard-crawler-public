package edu.usc.sql.krawler.buildgraphs;

import edu.usc.sql.krawler.utilities.Pair;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Getter @Setter
public class UIState {

    int parentStateID;
    int stateID;
    List<Pair<String, String>> crawlTrace;
    Set<String> nodesXpaths;

    List<Pair<Pair<Pair<String, String>, Integer>, Pair<String, String>>> nextStateTransitionList;
    public void addToNextStateTransitionList(Pair<Pair<Pair<String, String>, Integer>, Pair<String, String>> nextStateTransition){
        nextStateTransitionList.add(nextStateTransition);
    }

    String v_entry_xpath;
    String v_entry_successor_xpath;
    String v_entry_successor_successor_xpath;
    String v_entry_successor_successor_successor_xpath;


    public UIState(Set<String> nodesXpaths) {
        this.nodesXpaths = nodesXpaths;
        this.nextStateTransitionList = new ArrayList<>();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UIState uiState = (UIState) o;
        return this.nodesXpaths.equals(uiState.nodesXpaths);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nodesXpaths);
    }

    @Override
    public String toString() {
        return "UIState{" +
                "crawlTrace=" + crawlTrace +
                ", nodesXpaths=" + nodesXpaths +
                '}';
    }
}
