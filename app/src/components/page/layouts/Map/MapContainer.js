import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';



const SimpleMap = (props: any) => {
  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: false,
      streetViewControl: false,
      styles: [{
		featureType: "administrative",
		elementType: "geometry.fill",
		stylers: [{
			weight: 1.5
		}]
	},
	{
		featureType: "administrative.country",
		elementType: "geometry.fill",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "administrative.country",
		elementType: "labels",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "administrative.land_parcel",
		elementType: "geometry.fill",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "administrative.land_parcel",
		elementType: "labels",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "administrative.locality",
		elementType: "labels.text",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "administrative.locality",
		elementType: "geometry.stroke",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "administrative.province",
		elementType: "geometry.fill",
		stylers: [{
				color: "#00fdff"
			},
			{
				visibility: "off"
			}
		]
	},
	{
		featureType: "landscape",
		elementType: "geometry.fill",
		stylers: [{
			color: "#eaa0a2"
		}]
	},
	{
		featureType: "landscape",
		elementType: "geometry.stroke",
		stylers: [{
				color: "#00fdff"
			},
			{
				visibility: "off"
			}
		]
	},
	{
		featureType: "landscape",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "landscape.man_made",
		elementType: "geometry.fill",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "landscape.man_made",
		elementType: "geometry.stroke",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "poi",
		elementType: "geometry.fill",
		stylers: [{
			color: "#eaa0a2"
		}]
	},
	{
		featureType: "poi.attraction",
		elementType: "labels.icon",
		stylers: [{
				color: "#00fdff"
			},
			{
				visibility: "off"
			}
		]
	},
	{
		featureType: "poi.business",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "poi.government",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "poi.medical",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "poi.park",
		elementType: "labels.text",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "poi.place_of_worship",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "poi.place_of_worship",
		elementType: "labels.text",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "poi.school",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "poi.sports_complex",
		elementType: "labels",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "road.arterial",
		elementType: "geometry.fill",
		stylers: [{
				color: "#ffffff"
			},
			{
				visibility: "off"
			}
		]
	},
	{
		featureType: "road.arterial",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "road.arterial",
		elementType: "labels.text",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "road.highway",
		elementType: "geometry.fill",
		stylers: [{
			color: "#ffffff"
		}]
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "road.highway",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	},

	{
		featureType: "road.local",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "road.local",
		elementType: "labels.text",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "transit.line",
		elementType: "geometry.fill",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "transit.line",
		elementType: "geometry.stroke",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "transit.line",
		elementType: "labels.icon",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "transit.line",
		elementType: "labels.text",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [{
				color: "#00fdff"
			},
			{
				visibility: "off"
			}
		]
	},
	{
		featureType: "water",
		elementType: "geometry.fill",
		stylers: [{
			color: "#3a4764"
		}]
	},
	{
		featureType: "water",
		elementType: "labels.text",
		stylers: [{
			visibility: "off"
		}]
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [{
				color: "#00fdff"
			},
			{
				visibility: "off"
			}
		]
	}
	],
    };

  };

    const [center, setCenter] = useState({lat: 53.5188265, lng: -1.1900631 });
    const [zoom, setZoom] = useState(5);
    let _distanceToMouse = (markerPos, mousePos, markerProps) => {
		return false;
	}
    return (
        <div style={{ height: '105vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDn0GOiOz_vsprzRg7FMoT8moIjA8XPZck' }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
          distanceToMouse={_distanceToMouse}
        >
          <Marker
            lat={53.5188265}
            lng={-1.1900631}
            name="My Marker"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;