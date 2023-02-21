import xml.etree.ElementTree as Xet
import pandas as pd

event_cols = ["title", "venue", "description", "presenter", "price", "date"]
event_rows = []


event_xmlparse = Xet.parse('raw_data/events.xml')
event_root = event_xmlparse.getroot()
for i in event_root:
    # event_id = i.attrib['id']
    title = i.find("titlee").text
    venue = i.find("venueid").text
    description = i.find("desce").text
    presenter = i.find("presenterorge").text
    price = i.find("pricee").text
    date = i.find("predateE").text

    event_rows.append({
        # "_id": event_id,
        "title": title,
        "venue": venue,
        "description": description,
        "presenter": presenter,
        "price": price,
        "date": date
    })

events_df = pd.DataFrame(event_rows, columns=event_cols)
events_df.to_csv('data/programmes.csv')



venue_cols = ["venueCode", "name", "latitude", "longitude", "comment"]
venue_rows = []
venue_set = set()

venue_xmlparse = Xet.parse('raw_data/venues.xml')
venue_root = venue_xmlparse.getroot()
for i in venue_root:
    venueCode = i.attrib['id']
    name = i.find("venuee").text
    latitude = i.find("latitude").text
    longitude = i.find("longitude").text

    if longitude and latitude:
        if name.split(" ")[0] not in venue_set and len(venue_set) < 10:
            venue_set.add(name.split(" ")[0])
            venue_rows.append({
                "venueCode": venueCode,
                "name": name,
                "latitude": latitude,
                "longitude": longitude,
                "comment": []
            })

venue_df = pd.DataFrame(venue_rows, columns=venue_cols)
venue_df.to_csv('data/venues.csv', index=False)
