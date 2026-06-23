#!/bin/bash

# Function to determine the operating system
get_os_type() {
    case "$OSTYPE" in
    linux-gnu*)   echo "linux" ;;
    darwin*)      echo "macos" ;;
    msys*|cygwin*) echo "windows" ;;
    *)            echo "unknown" ;;
    esac
}

# Function to download mitmproxy based on the operating system
download_mitmproxy() {
    local os_type="$1"
    local mitmproxy_version="5.3.0"
    echo "Version $mitmproxy_version"
    local mitmproxy_url="https://downloads.mitmproxy.org/$mitmproxy_version/mitmproxy-$mitmproxy_version-"
    local directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    local mitmproxy_dir="$directory/src/main/resources/mitmproxy-$mitmproxy_version"
    echo "Directory $mitmproxy_dir"

    # Check if mitmproxy binary already exists
    if [ -x "${mitmproxy_dir}/mitmproxy" ]; then
        echo "mitmproxy binary already exists. Skipping download."
        return
    fi

    case "$os_type" in
    linux)
        curl -L "${mitmproxy_url}linux.tar.gz" -o "${mitmproxy_dir}/mitmproxy-${mitmproxy_version}-linux.tar.gz"
        tar -xzf "${mitmproxy_dir}/mitmproxy-${mitmproxy_version}-linux.tar.gz" -C "$mitmproxy_dir"
        chmod +x "${mitmproxy_dir}/mitmproxy"
        rm "${mitmproxy_dir}/mitmproxy-${mitmproxy_version}-linux.tar.gz"
        ;;
    macos)
        curl -L "${mitmproxy_url}osx.tar.gz" -o "${mitmproxy_dir}/mitmproxy-${mitmproxy_version}-macos.tar.gz"
        tar -xzf "${mitmproxy_dir}/mitmproxy-${mitmproxy_version}-macos.tar.gz" -C "$mitmproxy_dir"
        chmod +x "${mitmproxy_dir}"
        rm "${mitmproxy_dir}/mitmproxy-${mitmproxy_version}-macos.tar.gz"
        ;;
    windows)
        curl -k -L "${mitmproxy_url}windows.zip" -o "${mitmproxy_dir}/mitmproxy-${mitmproxy_version}-windows.zip"
        unzip "${mitmproxy_dir}/mitmproxy-${mitmproxy_version}-windows.zip" -d "$mitmproxy_dir"
        rm "${mitmproxy_dir}/mitmproxy-${mitmproxy_version}-windows.zip"
        ;;
    *)
        echo "Unsupported operating system: $os_type"
        exit 1
        ;;
    esac
}

# Determine the operating system
OS_TYPE=$(get_os_type)
echo "We are on $OS_TYPE"

# Download mitmproxy based on the operating system
download_mitmproxy "$OS_TYPE"
