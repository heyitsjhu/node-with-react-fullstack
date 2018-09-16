# TODO: Explain using this script to initiated the webhook if local tunnel crashes consistently
function localtunnel {
  lt -s damp-meadow-38518 --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done