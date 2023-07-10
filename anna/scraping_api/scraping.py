from apify_client import ApifyClient

# Initialize the ApifyClient with your API token
client = ApifyClient("apify_api_svyGRMzYo5p1YP6ub2K7yGqVhWRPRj34JOtl")

# Prepare the actor input
run_input = {
    "maxRequestsPerCrawl": 20,
    "extendOutputFunction": """async ({ data, item, product, images, fns, name, request, variants, context, customData, input, Apify }) => {
  return item;
}""",
    "extendScraperFunction": """async ({ fns, customData, Apify, label }) => {
 
}""",
    "customData": {},
    "maxConcurrency": 20,
    "maxRequestRetries": 3,
}

# Run the actor and wait for it to finish
run = client.actor("mshopik/decathlon-scraper").call(run_input=run_input)
i=0
# Fetch and print actor results from the run's dataset (if there are any)
for item in client.dataset(run["defaultDatasetId"]).iterate_items() and (i <= 300):
    if (i != 0) :
        print(item,'\n')
        title=item['title']
        price=item['price']
        description=item['description']
        img=item['image_urls_'][1]
        i=i+1
print(i)