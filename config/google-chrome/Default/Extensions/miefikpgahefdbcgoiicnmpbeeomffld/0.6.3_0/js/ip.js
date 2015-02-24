/*global window */

(function (window) {
    "use strict";

    function isIpV4(ip) {
        return !!ip.match(/\d+\.\d+\.\d+\.\d+/);
    }

    // See http://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
    function isIpReserved(ip) {
        if (true === window.DEFAULT_DEBUG) {
            return false;
        }

        if (!isIpV4(ip)) {
            if (ip === '::1') {
                return true;
            }

            return false;
        }

        var parts = ip.split('.').map(function (part) {
            return window.parseInt(part);
        });

        // Privates
        if (parts[0] === 192 && parts[1] === 168) {
            return true;
        }
        // Privates
        if (parts[0] === 10) {
            return true;
        }
        // Privates
        if (parts[0] === 172 && parts[1] >= 16 && parts[1] < 32) {
            return true;
        }

        // This host on this network
        if (parts[0] === 0) {
            return true;
        }
        // Shared address space
        if (parts[0] === 100 && parts[1] >= 64 && parts[1] < 128) {
            return true;
        }
        // Loopback
        if (parts[0] === 127) {
            return true;
        }
        // Link local
        if (parts[0] === 169 && parts[1] === 254) {
            return true;
        }
        // IETF protocol assignments & IPv4 Service Continuity Prefix & NAT64/DNS64 Discovery
        if (parts[0] === 192 && parts[1] === 0 && parts[2] === 0) {
            return true;
        }
        // Documentation
        if (parts[0] === 192 && parts[1] === 0 && parts[2] === 2) {
            return true;
        }
        // AS112-v4
        if (parts[0] === 192 && parts[1] === 31 && parts[2] === 196) {
            return true;
        }
        // AMT
        if (parts[0] === 192 && parts[1] === 52 && parts[2] === 193) {
            return true;
        }
        // 6to4 relay unicast
        if (parts[0] === 192 && parts[1] === 88 && parts[2] === 99) {
            return true;
        }
        // Benchmarking
        if (parts[0] === 192 && parts[1] >= 18 && parts[1] < 20) {
            return true;
        }
        // Documentation
        if (parts[0] === 198 && parts[1] === 51 && parts[2] === 100) {
            return true;
        }
        // Documentation
        if (parts[0] === 203 && parts[1] === 0 && parts[2] === 113) {
            return true;
        }
        // Reserved
        if (parts[0] >= 240) {
            return true;
        }
        // Limited broadcast
        if (parts[0] === 255 && parts[1] === 255 && parts[2] === 255 && parts[3] === 255) {
            return true;
        }

        return false;
    }

    window.isIpReserved = isIpReserved;
}(window));
