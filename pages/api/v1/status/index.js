function status(request, response) {
  response.status(200).json({ chave: "são acima de média" });
}

export default status;
