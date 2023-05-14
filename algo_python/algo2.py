import networkx as nx
import matplotlib.pyplot as plt

planning = {
    "Monday": {
        "8-12": "work",
    },
    "Tuesday": {
        "8-12": "soccer"
    },
    "Wednesday": {},
    "Thursday": {},
    "Friday": {},
    "Saturday": {
        "8-12": "work",
        "13-17": "soccer"
    },
    "Sunday": {}
}

# Get all possible activities for the week
activities = set()
for day in planning:
    for time_slot in planning[day]:
        activities.add(planning[day][time_slot])

# Create a color map for the activities
colors = {}
for i, activity in enumerate(sorted(activities)):
    colors[activity] = plt.cm.tab20(i)

# Create a new graph for each day
graphs = {}
for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]:
    graphs[day] = nx.Graph()

    # Add nodes for each time slot and activity
    for time_slot in planning[day]:
        activity = planning[day][time_slot]
        graphs[day].add_node(time_slot, color=colors[activity])

    # Add edges for each time slot
    time_slots = list(planning[day].keys())
    for i in range(len(time_slots)):
        for j in range(i + 1, len(time_slots)):
            graphs[day].add_edge(time_slots[i], time_slots[j])

    # Draw the graph for this day
    pos = nx.spring_layout(graphs[day], seed=42)
    print(day)
    print(graphs[day].nodes())
    node_colors = [colors[planning[day][n]] for n in graphs[day].nodes()]
    nx.draw(graphs[day], pos, with_labels=True, node_color=node_colors, node_size=500)
    plt.title(day)
    plt.show()
