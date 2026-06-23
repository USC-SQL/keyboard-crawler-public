package edu.usc.sql.krawler.webproxy;


import java.io.IOException;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class InterceptedMessage {

  public byte[] requestBody;
  public byte[] responseBody;

  public String requestMethod;
  public URL requestURL;
  public List<String[]> requestHeaders;
  public int responseCode;
  public List<String[]> responseHeaders;


  public InterceptedMessage(ByteBuffer buffer) throws IOException {
    buffer = buffer.order(ByteOrder.LITTLE_ENDIAN);

    int metadataSize = buffer.getInt();
    int request_content_size = buffer.getInt();
    int response_content_size = buffer.getInt();

    byte[] metadataBytes = new byte[metadataSize];
    buffer.get(metadataBytes);

    requestBody = new byte[request_content_size];
    buffer.get(requestBody);

    responseBody = new byte[response_content_size];
    buffer.get(responseBody);

    ObjectMapper mapper = new ObjectMapper();
    JsonNode metadata = mapper.readTree(metadataBytes);
    requestMethod = metadata.get("request").get("method").asText();
    requestURL = new URL(metadata.get("request").get("url").asText());
    JsonNode headers = metadata.get("request").get("headers");
    requestHeaders = new ArrayList<>();
    for (JsonNode headerNode : headers) {
      String[] headerArray = new String[2];
      headerArray[0] = headerNode.get(0).asText();
      headerArray[1] = headerNode.get(1).asText();
      requestHeaders.add(headerArray);
    }
    responseCode = metadata.get("response").get("status_code").asInt();
    headers = metadata.get("request").get("headers");
    responseHeaders = new ArrayList<>();
    for (JsonNode headerNode : headers) {
      String[] headerArray = new String[2];
      headerArray[0] = headerNode.get(0).asText();
      headerArray[1] = headerNode.get(1).asText();
      responseHeaders.add(headerArray);
    }
  }
}