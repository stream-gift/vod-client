"use server";

export async function GetStreamGiftUser(username: string) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.stream.gift/get-streamer?username=${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return resolve(data.user);
      });
  });
}
