#!/bin/bash

# Function to determine the OS
get_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "linux"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        echo "windows"
    else
        echo "Unsupported OS"
        exit 1
    fi
}

# Function to check if Firefox is already installed
firefox_installed() {
    if command -v firefox &>/dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to download Firefox for Linux
download_firefox_linux() {
    echo "Downloading Firefox for Linux..."
    wget -O firefox.tar.bz2 "https://download.mozilla.org/?product=firefox-latest&os=linux64&lang=en-US"
    echo "Firefox for Linux downloaded successfully."
}

# Function to download Firefox for macOS
download_firefox_macos() {
    echo "Downloading Firefox for macOS..."
    curl -L -o firefox.dmg "https://download.mozilla.org/?product=firefox-latest&os=osx&lang=en-US"
    echo "Firefox for macOS downloaded successfully."
}

# Function to download Firefox for Windows
download_firefox_windows() {
    echo "Downloading Firefox for Windows..."
    curl -L -o firefox.exe "https://download.mozilla.org/?product=firefox-latest&os=win&lang=en-US"
    echo "Firefox for Windows downloaded successfully."
}

# Function to install Firefox on Linux
install_firefox_linux() {
    echo "Installing Firefox on Linux..."
    tar xvjf firefox.tar.bz2 -C /opt/
    sudo ln -sf /opt/firefox/firefox /usr/local/bin/firefox
    echo "Firefox installed successfully."
    # Delete installation folder
    rm firefox.tar.bz2
}

# Function to install Firefox on macOS
install_firefox_macos() {
    echo "Installing Firefox on macOS..."
    hdiutil attach firefox.dmg
    cp -R /Volumes/Firefox/Firefox.app /Applications/
    hdiutil detach /Volumes/Firefox
    echo "Firefox installed successfully."
    # Delete installation folder
    rm firefox.dmg
}

# Function to install Firefox on Windows
install_firefox_windows() {
    echo "Installing Firefox on Windows..."
    # You can automate the installation process using a silent installer
    # For demonstration purposes, let's assume manual installation
    echo "Please install Firefox manually on Windows."
}

# Main function
main() {
    echo "Download Firefox script has started"
    if firefox_installed; then
        echo "Firefox is already installed."
        exit 0
    fi

    OS=$(get_os)
    if [ "$OS" == "linux" ]; then
        download_firefox_linux
        install_firefox_linux
    elif [ "$OS" == "macos" ]; then
        download_firefox_macos
        install_firefox_macos
    elif [ "$OS" == "windows" ]; then
        download_firefox_windows
        install_firefox_windows
    fi
    echo "Finished - download firefox"
}

# Execute main function
main
