async function run() {
  const geminiKey = "AQ.Ab8RN6Jd7rxK8sayOh69BKpcxWRQoAqO6uyfH-uS2EqMlt4gJg";
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${geminiKey}`
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Hello" }] }]
    })
  });
  console.log("Status:", res.status);
  const data = await res.json();
  console.log(data);
}
run();
