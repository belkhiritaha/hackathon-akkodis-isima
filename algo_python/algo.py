planning = {
    "monday": {
        "8-12": "work",
        "13-17": ""
    },
    "tuesday": {
        "8-12": "soccer",
        "13-17": ""
    },
    "wednesday": {
        "8-12": "",
        "13-17": ""
    },
    "thursday": {
        "8-12": "",
        "13-17": ""
    },
    "friday": {
        "8-12": "",
        "13-17": ""
    },
    "saturday": {
        "8-12": "work",
        "13-17": "soccer"
    },
    "sunday": {
        "8-12": "",
        "13-17": ""
    }
}

HOME = 0
WORK = 1
SOCCER = 2

activity_map = {
    "home": HOME,
    "work": WORK,
    "soccer": SOCCER
}

weights = {
    "monday": [[0, 5, 10], [5, 0, 1], [10, 1, 0]],
    "tuesday": [[0, 2, 7], [2, 0, 1], [7, 1, 0]],
    "wednesday": [[0, 2, 3], [2, 0, 1], [3, 1, 0]],
    "thursday": [[0, 6, 9], [6, 0, 1], [9, 1, 0]],
    "friday": [[0, 2, 3], [2, 0, 1], [3, 1, 0]],
    "saturday": [[0, 2, 3], [2, 0, 1], [3, 1, 0]],
    "sunday": [[0, 2, 3], [2, 0, 1], [3, 1, 0]]
}

# get all activies for the week
def get_activities(planning):
    activities = []
    for day in planning:
        for time in planning[day]:
            if planning[day][time] != "work" and planning[day][time] != "":
                activities.append(planning[day][time])
    return activities

all_activities = get_activities(planning)


# build graph of all possible activities
def build_graph(day, remaining_activities):
    all_activities_copy = remaining_activities.copy()
    if len(all_activities_copy) == 0:
        return
    graph = { "home": [] }
    
    # First layer
    if (planning[day]["8-12"] == "work"):
        work_node = {
            "work" : []
        }
        graph["home"].append(work_node)
        # Second layer
        if ("13-17" in planning[day].keys() and planning[day]["13-17"] == "work"):
            work_node = {
                "work" : ["home"]
            }
            graph["home"].append(work_node)

        else:
            # add all activities to home
            for activity in all_activities_copy + ["home"]:
                activity_node = {
                    activity: ["home"]
                }
                graph["home"][0]["work"].append(activity_node)
    else:
        # add all activities to home
        for activity in all_activities_copy:
            activity_node = {
                activity: []
            }
            graph["home"].append(activity_node)
            # remove activity from list
            all_activities_copy.remove(activity)

            # check if we have work in the afternoon
            if ("13-17" in planning[day].keys() and planning[day]["13-17"] == "work"):
                work_node = {
                    "work" : ["home"]
                }
                # get all nodes in graph["home"] and add work_node to each node
                for node in graph["home"]:
                    # get the key of the activity
                    activity = list(node.keys())[0]
                    node[activity].append(work_node)
            else:
                for node in graph["home"]:
                    # get the key of the activity
                    activity = list(node.keys())[0]
                    node[activity].append("home")

    # remove any duplicates from graph["home"]
            
            # break
    return graph


def get_carbon_footprint(day, activity, location):
    return weights[day][location][activity_map[activity]]

def get_day_min_carbon_footprint(day, remaining_activities, week_graph):
    min = 1000000
    selected_activities = []
    #print("------------DAY: " + day + "------------")
    print(week_graph)
    if week_graph[day] == None:
        return (0, [])
    for morning_activity in week_graph[day]["home"]:
        activity_name = list(morning_activity.keys())[0]
        afternoon_activities = morning_activity[activity_name]
        #print("Morning activity: " + activity_name)
        sum_first_layer = get_carbon_footprint(day, activity_name, HOME)
        # print("Sum first layer: " + str(sum_first_layer))
        #print("Afternoon activities: " + str(afternoon_activities))
        for afternoon_activity in afternoon_activities:
            if afternoon_activity == "home":
                #print("Afternoon activity: " + "home")
                # TRAITEMENT SI ON n'A PAS DE TRAJET L'APRES MIDI
                sum_second_layer = sum_first_layer + get_carbon_footprint(day, "home", activity_map[activity_name])
                #print("Sum second layer: " + str(sum_second_layer))
                if sum_second_layer < min:
                    min = sum_second_layer
                    selected_activities = [activity_name]
            else: 
                afternoon_activity_name = list(afternoon_activity.keys())[0]
                sum_second_layer = sum_first_layer + get_carbon_footprint(day, afternoon_activity_name, activity_map[activity_name]) + get_carbon_footprint(day, "home", activity_map[afternoon_activity_name])
                #print("Afternoon activity: " + afternoon_activity_name)
                #print("Sum second layer: " + str(sum_second_layer))
                if sum_second_layer < min:
                    min = sum_second_layer
                    selected_activities = [activity_name, afternoon_activity_name]

    # print("Min: " + str(min))
    # print("Selected activities: " + str(selected_activities))
    return (min, selected_activities)

SUPRA_ACTIVITIES = get_activities(planning)

def get_week_min_carbon_footprint(days_to_compute, remaining_activities, optimized_activities):
    week_graph = {
        "monday": build_graph("monday", remaining_activities),
        "tuesday": build_graph("tuesday", remaining_activities),
        "wednesday": build_graph("wednesday", remaining_activities),
        "thursday": build_graph("thursday", remaining_activities),
        "friday": build_graph("friday", remaining_activities),
        "saturday": build_graph("saturday", remaining_activities),
        "sunday": build_graph("sunday", remaining_activities)
    }
    print("All activities: " + str(SUPRA_ACTIVITIES))
    print("-----------------------")
    print("Days to compute: " + str(days_to_compute))
    if days_to_compute == []:
        print("caca lol")
        return (0, [])
    if len(days_to_compute) == 1:
        print("------------LAST DAY: " + days_to_compute[0] + "------------")
        day_min_carbon_footprint = get_day_min_carbon_footprint(days_to_compute[0], remaining_activities, week_graph)
        if day_min_carbon_footprint == None:
            print("caca finale")
        return day_min_carbon_footprint
    else:
        week_carbon_footprint = {}

        for day in days_to_compute:
            day_min_carbon_footprint = get_day_min_carbon_footprint(day, remaining_activities, week_graph)
            if day_min_carbon_footprint == None:
                return
            week_carbon_footprint[day] = day_min_carbon_footprint


        # get the min of the week
        min = 1000000
        selected_activities = []
        selected_day = ""
        for day in week_carbon_footprint:
            if week_carbon_footprint[day][0] < min:
                min = week_carbon_footprint[day][0]
                selected_activities = week_carbon_footprint[day][1]
                selected_day = day

    print("Min of the week: " + str(min))
    print("Selected day of the week: " + selected_day)
    print("Selected activities of the week: " + str(selected_activities))
    print("------------NEXT ITERATION DAYS TO COMPUTE: " + str(days_to_compute.pop(days_to_compute.index(selected_day))) + "------------")
    for activity in selected_activities:
        print ("Activity: " + activity)
        if activity == "work" or activity == "home":
            continue
        remaining_activities.pop(remaining_activities.index(activity))
        print("Remaining activities: " + str(remaining_activities))
        
    print("OPTIMIZED ACTIVITIES: " + str(optimized_activities))
        # remove work if it's in the selected activities
    get_week_min_carbon_footprint(days_to_compute, remaining_activities, optimized_activities + [(selected_day, selected_activities)])

get_week_min_carbon_footprint(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], SUPRA_ACTIVITIES, [])

# build_graph("monday")
# print(build_graph("tuesday"))
# build_graph("saturday")
# build_graph("sunday")
