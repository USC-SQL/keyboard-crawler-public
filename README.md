# Keyboard Krawler for Web Application

Using this tool, you can create a keyboard navigation graph for a website.

## Requirements

Java Version = 11.0.15+

Maven Version = 3.9.4+

## Configuration

After downloading the version you should fix the configurations of the project.

On `run_config_template` file you will find the template of the config.

*Make* a copy and name it `run_config` and fill out the paths with your paths.

In order to create the KNFG graph you need to download the cache version of the website.

In order to do it you should... //TODO

You may use an already cached website from the folder `cachedSubjects`.

## Selection of Broswer

With the krawler you can use Firefox, Chrome, Safari, and Edge.

If you don't have chrome or firefox, we are donwloading.

**Unfortunately, Safari doesn't work with cached websites using proxy.**

To select the browser that you want you need to set up the "browser_type" it in run_config file. 

If you check the template you have the following options: chrome, firefox, edge, safari.

Please be carefull because is **case sensitive**

### Chrome and Firefox

**WARNING!!** If you dont have Chrome or Firefox you can uncomment the scripts on pom.xml to install them.

### Safari

Before you run the Safari, do the following:

1. Open Safari
2. Go to Safari > Settings in the menu bar.
3. Click on the 'Advanced' tab.
4. Check the box next to "Show features for web developers".
5. Now you see “develop” option is on the MacOS menu 
6. Select develop ⁃ Select “Developer settings…” 
7. Check “Allow remote automation” 
8. Now you can run your tests against safari

**Unfortunately, Safari doesn't work with cached websites using proxy.**

### Edge

If you want to use edge on Linux or Mac, you should download it first. 
We do not support auto download. 

## Build the Project

To build the project you should run `mvn clean install`. Once you will do this, firefox, mitmproxy and other driver will be download it if you dont have it. 

**WARNING!!** If you faced an issue with gecko driver and firefox check the following:
Delete your geckodriver from you cache and let the program download it

**WARNING!!** For **Windows** users, you should have sh in your PATH. To do that, an easy way is to add Git and then add it to your path. 

## Run the project

We have four different versions that you may run,

[RunApproach.java](src%2Fmain%2Fjava%2Fedu%2Fusc%2FRunApproach.java): Is the simplested and faster version.
Using this version you will have the simplest version of the Keyboard navigation. Only the node and edges for the different UI States.

[RunApproachKDF.java](src%2Fmain%2Fjava%2Fedu%2Fusc%2FRunApproachKDF.java):

[RunApproachKFFG.java](src%2Fmain%2Fjava%2Fedu%2Fusc%2FRunApproachKFFG.java):

[RunApproachKRFG.java](src%2Fmain%2Fjava%2Fedu%2Fusc%2FRunApproachKRFG.java):

## Key selection

On run_config there is an attribute nav_keys. Here you can select the keys that you want the Krawler to use. By default we have all the keys.

## How to cache a website

1. Add the website name and corresponding URL to your spreadsheet that contains your subjects. 
2. Update the file path that you want to save your subjects on run_config (save_cached_websites_path)
3. Update your config file to have the new website be your selected subject. 
This will cause a new browser window to open that loads the website. 
You must wait until the website is fully loaded before closing the window, or else the cache may be incomplete. 
4. **Note** that the mitm cache is continuously running the entire time a webpage is open. 
This means that if a given webpage contains infinite content, then it will continue to cache that information. 
I share this because (at least in the past) the size of these mitm caches can grow to be quite large on complex websites, 
which significantly impacts the runtime of downstream tasks (e.g., running the KAF approach). 
5. Another thing to **note** is that mitm will only cache what is available to it. 
An example is that if there exists a button that opens a pop-up dialog, the mitm cache will only save the button's
functionality if you press the button while caching. 
With this in mind, the best practice is to **interact** with as much of the web page as possible, 
but avoid infinite/unnecessary content when caching subject web pages. 
6. Once all of this has been done, clode the program from your IDE (e.g., on Intelij the red button)
and a cache of the website will be saved in the place that you specified in the config file.

If you want also to check that your website has been cached successfully, you may run the [LoadPageWithProxy.java](src%2Fmain%2Fjava%2Fedu%2Fusc%2FLoadPageWithProxy.java)
and check the result of the page. 

**WARNING** if you try a second time to cache the same website and the file has zero bytes, be sure that before running the file you have closed the 9998 port. 


## Run subjects

In order to run a webpage, you need to create a csv file similar to [subjects-run.csv](src%2Fmain%2Fresources%2Fsubjects-run.csv) and give the path to the run_config on list_of_subjects_to_run.

Then you can run the program and it would read the rows one-by-one to crawlr each webpage. 
