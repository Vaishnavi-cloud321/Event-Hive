# ============================================================
#  EventHive - ML-Based Event Recommendation System
#  Method : Content-Based Filtering
#  Library: scikit-learn (CountVectorizer + Cosine Similarity)
# ============================================================

import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# ─────────────────────────────────────────
#  STEP 1 — Dataset of Technical Events
# ─────────────────────────────────────────
events_data = {
    "Event Name": [
        # AI
        "AI Innovations Summit",
        "Artificial Intelligence Workshop",
        "Deep Learning Bootcamp",
        "AI Ethics Conference",
        "Neural Networks Masterclass",
        "Generative AI Hackathon",
        # Machine Learning
        "Machine Learning Fundamentals",
        "ML Model Deployment Workshop",
        "Supervised Learning Deep Dive",
        "Reinforcement Learning Seminar",
        "Applied ML for Engineers",
        # Data Science
        "Data Science Bootcamp",
        "Data Analytics & Visualization",
        "Big Data Processing Workshop",
        "Python for Data Science",
        "Statistics for Data Scientists",
        "Data Engineering Summit",
        # Web Development
        "React.js Advanced Workshop",
        "Full Stack Development Bootcamp",
        "Node.js and Express Masterclass",
        "Modern CSS & UI Design",
        "Web Performance Optimization",
        "JavaScript ES2024 Features",
        # Cyber Security
        "Ethical Hacking Workshop",
        "Cyber Security Fundamentals",
        "Network Security Masterclass",
        "Penetration Testing Bootcamp",
        "Cloud Security Summit",
        "CTF (Capture The Flag) Competition",
    ],

    "Category": [
        "AI", "AI", "AI", "AI", "AI", "AI",
        "Machine Learning", "Machine Learning", "Machine Learning",
        "Machine Learning", "Machine Learning",
        "Data Science", "Data Science", "Data Science",
        "Data Science", "Data Science", "Data Science",
        "Web Development", "Web Development", "Web Development",
        "Web Development", "Web Development", "Web Development",
        "Cyber Security", "Cyber Security", "Cyber Security",
        "Cyber Security", "Cyber Security", "Cyber Security",
    ],

    "Tags": [
        # AI
        "artificial intelligence machine learning deep learning neural networks automation",
        "artificial intelligence python automation robotics nlp transformers",
        "deep learning neural networks tensorflow pytorch gpu training",
        "artificial intelligence ethics policy fairness responsible ai",
        "neural networks deep learning backpropagation perceptron layers",
        "generative ai llm gpt diffusion models creative ai prompting",
        # Machine Learning
        "machine learning algorithms supervised unsupervised scikit-learn python",
        "machine learning mlops deployment docker kubernetes flask api",
        "supervised learning regression classification decision trees random forest",
        "reinforcement learning agents rewards policy q-learning openai gym",
        "machine learning applied engineering production pipelines feature engineering",
        # Data Science
        "data science python pandas numpy analysis statistics visualization",
        "data analytics tableau powerbi visualization dashboard insights",
        "big data spark hadoop distributed computing processing pipeline",
        "python data science jupyter numpy matplotlib seaborn",
        "statistics probability hypothesis testing regression analysis r",
        "data engineering etl pipeline sql databases warehousing airflow",
        # Web Development
        "react javascript frontend components hooks state management redux",
        "full stack web development node react mongodb express javascript",
        "node express backend api rest javascript server npm",
        "css html ui design responsive animations flexbox grid",
        "web performance optimization lighthouse caching cdn lazy loading",
        "javascript es6 async promises modules browser web apis",
        # Cyber Security
        "ethical hacking penetration testing kali linux vulnerabilities exploits",
        "cyber security network firewalls threats defense awareness",
        "network security protocols encryption vpn firewall intrusion detection",
        "penetration testing tools burpsuite metasploit vulnerability assessment",
        "cloud security aws azure devSecOps iam zero trust",
        "ctf challenges hacking puzzles reverse engineering forensics",
    ]
}

# ─────────────────────────────────────────
#  STEP 2 — Build the DataFrame
# ─────────────────────────────────────────
df = pd.DataFrame(events_data)

# Combine Category + Tags into a single feature string
df["Features"] = df["Category"].str.lower() + " " + df["Tags"]

# ─────────────────────────────────────────
#  STEP 3 — Vectorize & Compute Similarity
# ─────────────────────────────────────────
vectorizer = CountVectorizer(stop_words="english")
count_matrix = vectorizer.fit_transform(df["Features"])
cosine_sim = cosine_similarity(count_matrix, count_matrix)

# ─────────────────────────────────────────
#  STEP 4 — Recommendation Function
# ─────────────────────────────────────────
def recommend_events(user_input, top_n=5):
    """
    Given a user's interest keyword or exact event name,
    return the top N most similar events.
    """
    user_input_lower = user_input.strip().lower()

    # ── Try exact / partial name match first ──
    match_index = None
    for i, name in enumerate(df["Event Name"]):
        if user_input_lower in name.lower():
            match_index = i
            break

    # ── If no name match, treat input as a freetext interest ──
    if match_index is None:
        # Vectorize the freetext query against the existing vocabulary
        user_vec = vectorizer.transform([user_input_lower])
        sim_scores = cosine_similarity(user_vec, count_matrix)[0]
        top_indices = sim_scores.argsort()[::-1][:top_n]
        results = df.iloc[top_indices][["Event Name", "Category"]].copy()
        results["Similarity Score"] = [round(sim_scores[i], 2) for i in top_indices]
        return results, None  # no base event

    # ── Name match: use cosine similarity row ──
    base_event = df["Event Name"].iloc[match_index]
    sim_scores = list(enumerate(cosine_sim[match_index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    # Exclude the matched event itself
    sim_scores = [(i, s) for i, s in sim_scores if i != match_index][:top_n]

    results = df.iloc[[i for i, _ in sim_scores]][["Event Name", "Category"]].copy()
    results["Similarity Score"] = [round(s, 2) for _, s in sim_scores]
    return results, base_event


# ─────────────────────────────────────────
#  STEP 5 — Display Helpers
# ─────────────────────────────────────────
DIVIDER = "─" * 55
CATEGORY_ICONS = {
    "AI": "🤖",
    "Machine Learning": "📊",
    "Data Science": "🔬",
    "Web Development": "🌐",
    "Cyber Security": "🔒",
}

def print_recommendations(results, base_event, user_input):
    print(f"\n{'═'*55}")
    print("       🐝  EventHive Recommendation Engine")
    print(f"{'═'*55}")

    if base_event:
        print(f"  Input Event  : {base_event}")
    else:
        print(f"  Your Interest: \"{user_input}\"")

    print(f"{DIVIDER}")
    print(f"  {'#':<3}  {'Event Name':<38} {'Category'}")
    print(DIVIDER)

    for rank, (_, row) in enumerate(results.iterrows(), start=1):
        icon = CATEGORY_ICONS.get(row["Category"], "📌")
        score_bar = "█" * int(row["Similarity Score"] * 10)
        print(f"  {rank:<3}  {row['Event Name']:<38} {icon} {row['Category']}")
        print(f"       Similarity: [{score_bar:<10}] {row['Similarity Score']:.2f}\n")

    print(DIVIDER)
    print("  Tip: Try entering 'Machine Learning', 'hacking',")
    print("       'react', 'data', or any event name above!")
    print(f"{'═'*55}\n")


# ─────────────────────────────────────────
#  STEP 6 — Main Interactive Loop
# ─────────────────────────────────────────
def main():
    print("\n╔═══════════════════════════════════════════════════╗")
    print("║   🐝  EventHive — ML Event Recommendation System  ║")
    print("║       Content-Based Filtering | scikit-learn       ║")
    print("╚═══════════════════════════════════════════════════╝")
    print("\nAvailable categories:")
    for cat, icon in CATEGORY_ICONS.items():
        print(f"  {icon}  {cat}")
    print("\nYou can type an event name OR a general interest.")
    print("Type  'list'  to see all events   |   'quit' to exit\n")

    while True:
        user_input = input("🔍 Enter event name / interest: ").strip()

        if not user_input:
            print("  ⚠️  Please enter something!\n")
            continue

        if user_input.lower() == "quit":
            print("\n  👋  Thanks for using EventHive! Goodbye.\n")
            break

        if user_input.lower() == "list":
            print(f"\n{DIVIDER}")
            print("  All Available Events:")
            print(DIVIDER)
            for _, row in df.iterrows():
                icon = CATEGORY_ICONS.get(row["Category"], "📌")
                print(f"  {icon}  [{row['Category']}] {row['Event Name']}")
            print(f"{DIVIDER}\n")
            continue

        results, base_event = recommend_events(user_input, top_n=5)

        if results.empty:
            print("  ❌  No recommendations found. Try a different keyword.\n")
        else:
            print_recommendations(results, base_event, user_input)


if __name__ == "__main__":
    main()