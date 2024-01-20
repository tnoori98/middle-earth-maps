package com.example.backend.services;

import com.example.backend.dto.response.TwitterResponseDto;
import com.twitter.clientlib.ApiException;
import com.twitter.clientlib.TwitterCredentialsBearer;
import com.twitter.clientlib.api.TwitterApi;
import com.twitter.clientlib.model.MultiTweetLookupResponse;
import com.twitter.clientlib.model.ResourceUnauthorizedProblem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * TwitterService to retrieve tweets from Twitter API
 */

@Service
public class TwitterService {
    private TwitterResponseDto twitterResponseDto = null;

    @Value("${bearerToken}")
    private String bearerToken;

    public TwitterResponseDto getTweets(){
        twitterResponseDto = new TwitterResponseDto();
        TwitterApi apiInstance = new TwitterApi();
        TwitterCredentialsBearer credentials = new TwitterCredentialsBearer(bearerToken);
        apiInstance.setTwitterCredentials(credentials);

        Set<String> tweetFields = new HashSet<>();
        tweetFields.add("author_id");
        tweetFields.add("id");
        tweetFields.add("created_at");
        tweetFields.add("lang");

        try{
            MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
            headers.add("Authorization", String.format("Bearer %s", bearerToken));

            HttpEntity<Void> entity = new HttpEntity<>(headers);

            MultiTweetLookupResponse response = (new RestTemplate().exchange("https://api.twitter.com/2/tweets/search/recent?query=lotr", HttpMethod.GET, entity, MultiTweetLookupResponse.class)).getBody();

            List<String> tweetIds = new ArrayList<>();

            for(int i = 0; i < response.getData().size(); i++){
                tweetIds.add(response.getData().get(i).getId());
            }

            MultiTweetLookupResponse result = apiInstance.tweets().findTweetsById(tweetIds, null, tweetFields, null, null,null,null);
            if(result.getErrors()!=null && result.getErrors().size()>0){
                System.out.println("Error:");

                result.getErrors().forEach(e -> {
                    System.out.println(e.toString());
                    if (e instanceof ResourceUnauthorizedProblem) {
                        System.out.println(e.getTitle() + " " + e.getDetail());
                    }
                });
            }
            else {
                System.out.println("findTweetById - Tweet Text: " + result);
                twitterResponseDto.setResponse(result);
                return twitterResponseDto;
            }
        }
        catch (ApiException e) {
                System.err.println("Status code: " + e.getCode());
                System.err.println("Reason: " + e.getResponseBody());
                System.err.println("Response headers: " + e.getResponseHeaders());
                e.printStackTrace();
        }
        return null;
    }
}
