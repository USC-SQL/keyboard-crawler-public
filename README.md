# Keyboard Krawler

Krawler is a research tool for crawling web applications through keyboard interaction and generating a keyboard navigation graph model, i.e., the Keyboard Experience Representation (KER).

The repository is centered on:

```text
src/main/java/edu/usc/sql/krawler/RunApproachKrawler.java
```

Krawler uses Selenium WebDriver, browser replay through mitmproxy, and configurable keyboard actions to explore keyboard-reachable UI states and transitions.

## What Keyboard Krawler does

Krawler:

* opens a target web page in a configured browser;
* routes browser traffic through mitmproxy;
* replays cached web content when available;
* explores the page using keyboard navigation and interaction keys;
* records discovered UI states and keyboard-triggered transitions;
* writes the resulting keyboard navigation graph as JSON.

## Requirements

* Java JDK 8 or newer
* Maven
* A configured `run_config` file
* A subject-mapping CSV file
* Cached website content or a configured subject URL

Browser and mitmproxy setup are handled through the repository setup flow. The normal setup path is:

```bash
mvn clean install
```

This compiles the project and runs the repository setup scripts configured in Maven.

## Repository layout

```text
keyboard-crawler-public/
├── README.md
├── pom.xml
├── run_config_template
├── download_mitmproxy.sh
├── download_firefox.sh
├── download_chrome.sh
└── src/main/java/edu/usc/sql/krawler/
    └── RunApproachKrawler.java
```

## Setup

Clone the repository:

```bash
git clone git@github.com:USC-SQL/keyboard-crawler-public.git
cd keyboard-crawler-public
```

Build the project:

```bash
mvn clean install
```

This is the intended setup step. Do not manually edit browser-driver paths unless you are debugging a local environment issue.

## Configuration

Copy the template config file:

```bash
cp run_config_template run_config
```

Then edit `run_config` for your local experiment.

Example:

```text
run_single_subject===netflix
list_of_subjects_to_run===/path/to/subjects-run.csv
headless_mode===true
num_of_concurrent_webdrivers===2
mitmproxy_folder_name===mitmproxy-5.3.0
browser_type===chrome
proxy_port===9998
subject_mapping_csv===/path/to/subjects.csv
cached_subjects_location===/path/to/cached-subjects/
project_output_dir===/path/to/output-directory/
```

## Important config fields

| Field                                      | Meaning                                                                                  |
| ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `run_single_subject`                       | Name of one subject to crawl. This should match a subject name in `subject_mapping_csv`. |
| `list_of_subjects_to_run`                  | CSV containing subject names to crawl. Used when running multiple subjects.              |
| `headless_mode`                            | `true` to run the browser headlessly; `false` to show the browser window.                |
| `num_of_concurrent_webdrivers`             | Number of concurrent WebDriver instances used by the crawler.                            |
| `mitmproxy_folder_name`                    | Name of the mitmproxy folder under `src/main/resources`.                                 |
| `browser_type`                             | Browser used by the crawler. Supported public options are `chrome` and `firefox`.        |
| `proxy_port`                               | Starting proxy port used by mitmproxy.                                                   |
| `subject_mapping_csv`                      | Local CSV mapping subject names to URLs.                                                 |
| `cached_subjects_location`                 | Directory where cached web page content file is stored.                                        |
| `project_output_dir`                       | Directory where crawler output is written.                                               |

## Browser selection

Krawler supports browser-based crawling through Selenium WebDriver.

Choose the browser in `run_config`:

```text
browser_type===chrome
```

or:

```text
browser_type===firefox
```

Chrome and Firefox are the primary supported browsers for the public repository.

The repository includes setup scripts for browser-related setup:

```text
download_chrome.sh
download_firefox.sh
```

The normal public workflow is still:

```bash
mvn clean install
```

Then choose the browser through `browser_type`.

### Headless mode

For debugging, where you want to watch the browser, use:

```text
headless_mode===false
```

otherwise

```text
headless_mode===true
```

## Subject mapping CSV

The subject-mapping CSV maps each subject name to the URL that should be crawled.

Example:

```csv
netflix,https://www.netflix.com/login
```

The subject name should match the value used in `run_single_subject`.

For example:

```text
run_single_subject===netflix
```

should correspond to a row whose subject name is `netflix`.

## Cached subjects

Krawler uses mitmproxy to replay cached websites.

Cached subject data should be stored under the directory configured by:

```text
cached_subjects_location
```

For example, if:

```text
cached_subjects_location===/path/to/cached-subjects/
run_single_subject===netflix
```

then the crawler expects the cached subject data to be associated with:

```text
/path/to/cached-subjects/netflix
```

When creating a cache, interact with the parts of the web page that should be available during replay. mitmproxy can only replay content and behavior that was captured during caching.

Avoid unnecessary infinite scrolling, autoplaying content, or unrelated dynamic content when building caches, because large caches can significantly slow later crawling runs.

## Running the crawler

After setup and configuration, run:

```text
edu.usc.sql.krawler.RunApproachKrawler
```

In IntelliJ IDEA:

1. Open the repository as a Maven project.
2. Run `mvn clean install`.
3. Copy `run_config_template` to `run_config`.
4. Edit `run_config`.
5. Open `RunApproachKrawler.java`.
6. Run the `main` method.

## Output

Krawler writes the generated keyboard navigation graph under:

```text
project_output_dir/output/KERKrawler/<subject-name>/KER.json
```

Example:

```text
/path/to/output-directory/output/KERKrawler/netflix/KER.json
```

## Keyboard actions

Krawler explores pages using configured keyboard actions. The key configuration is controlled through the project config and source code. The default configuration is intended to cover common keyboard navigation and activation behavior.

Typical keyboard actions include navigation keys such as `Tab` and `Shift+Tab`, activation keys such as `Enter` and `Space`, and other supported keys used by the crawler implementation.

## Citation

If you use Krawler in research, please cite the corresponding Keyboard Krawler publication.