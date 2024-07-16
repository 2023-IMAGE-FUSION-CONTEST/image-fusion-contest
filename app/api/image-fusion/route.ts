export async function POST(req: Request) {
	const { fn_index, data } = await req.json()

	const res = await fetch("https://demo.70e9f1a0f18a49a29a0cd16c9e0750df.lambdaspaces.com/run/predict", {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({ fn_index, data }),
	});

	return new Response(await res.text(), {
		headers: {
			"Content-Type": "application/json"
		}
	});
}
