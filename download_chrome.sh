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

# Function to check if Chrome is already installed
chrome_installed() {
    if command -v google-chrome &>/dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to download Chrome for Linux
download_chrome_linux() {
    echo "Downloading Chrome for Linux..."
    wget -O chrome.deb "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb"
    echo "Chrome for Linux downloaded successfully."
}

# Function to download Chrome for macOS
download_chrome_macos() {
    echo "Downloading Chrome for macOS..."
    curl -L -o chrome.dmg "https://dl.google.com/chrome/mac/stable/GGRO/googlechrome.dmg"
    echo "Chrome for macOS downloaded successfully."
}

# Function to download Chrome for Windows
download_chrome_windows() {
    echo "Downloading Chrome for Windows..."
    curl -L -o chrome_installer.exe "https://dl.google.com/chrome/install/latest/chrome_installer.exe"
    echo "Chrome for Windows downloaded successfully."
}

# Function to install Chrome on Linux
install_chrome_linux() {
    echo "Installing Chrome on Linux..."
    sudo dpkg -i chrome.deb
    sudo apt-get install -f
    echo "Chrome installed successfully."
    # Delete installation folder
    rm chrome.deb
}

# Function to install Chrome on macOS
install_chrome_macos() {
    echo "Installing Chrome on macOS..."
    hdiutil attach chrome.dmg
    cp -R /Volumes/Google\ Chrome/Google\ Chrome.app /Applications/
    hdiutil detach /Volumes/Google\ Chrome
    echo "Chrome installed successfully."
    # Delete installation folder
    rm chrome.dmg
}

# Function to install Chrome on Windows
install_chrome_windows() {
    echo "Installing Chrome on Windows..."
    # You can automate the installation process using silent installers
    # For demonstration purposes, let's assume manual installation
    echo "Please install Chrome manually on Windows."
}

# Main function
main() {
    if chrome_installed; then
        echo "Google Chrome is already installed."
        exit 0
    fi

    OS=$(get_os)
    if [ "$OS" == "linux" ]; then
        download_chrome_linux
        install_chrome_linux
    elif [ "$OS" == "macos" ]; then
        download_chrome_macos
        install_chrome_macos
    elif [ "$OS" == "windows" ]; then
        download_chrome_windows
        install_chrome_windows
    fi
}

# Execute main function
main
