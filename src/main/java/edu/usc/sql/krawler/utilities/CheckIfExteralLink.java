package edu.usc.sql.krawler.utilities;

import lombok.Getter;
import lombok.Setter;

import java.net.URI;
import java.net.URL;

public class CheckIfExteralLink {

    public static void main(String[] args) {

        String aa = "https://www.wikipedia.org/";
        String bb = "https://en.wikipedia.org/";

        boolean ress = isExternal(aa, bb);

        System.out.println(ress);

    }


    public static boolean isExternal(String url, String href) { // TODO christina
        if (href.startsWith("http")) {
            try {
                // Parse the URL
                System.out.println("christina: check if external: " + href);

                URI uri = URI.create(href);

                URL urll = new URL(url);
                String siteHostName = urll.getHost();
                System.out.println("siteHostName: " + siteHostName);

                // Get the host and path
                String uriHost = uri.getHost().toLowerCase();
                String uriPath = uri.getPath();

                // Check if the host matches
                if (uriHost.equals(siteHostName.toLowerCase())) {
                    System.out.println("christina Same domain");
                    return false; // Same domain
                }

                // Check if it's a fragment or relative path
                if (uriHost.equals(siteHostName.toLowerCase()) && uriPath.startsWith("/")) {
                    System.out.println("christina Same domain");
                    return false; // Same webpage
                }
                System.out.println("christina external domain");
                return true; // External if not matching the above
            } catch (IllegalArgumentException e) {
                System.out.println("Unreadable external link {} " + href);
            } catch (Exception ex) {
                System.out.println("Unreadable external link {}");
            }
        }
        return false;
    }
}
