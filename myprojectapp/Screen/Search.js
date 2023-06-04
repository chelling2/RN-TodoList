import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const Search = () => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('미입력 상태');

  const generateText = async () => {
    const prompt = text;
    const apiKey = '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';

    const url =
      'https://api.openai.com/v1/engines/text-davinci-003/completions';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    const data = {
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.7,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setResponse(result.choices[0].text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> OpenAI Chat</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="검색할 것을 입력하세요"
          value={text}
          editable={true}
          multiline={true}
          onChangeText={(value) => setText(value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generateText}>
        <Text style={styles.buttonText}>클릭</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.response}>{response}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'yellow',
    marginBottom: 25,
    marginTop: 50,
  },
  input: {
    backgroundColor: 'white',
    height: 200,
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  response: {
    fontSize: 18,
    color: 'white',
  },
});

export default Search;
