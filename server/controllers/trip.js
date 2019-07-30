import trips  from '../model/trip';
import {findQueryByDestination, findQueryByOrigin} from '../helpers';

//import {verifyToken} from '../../helpers';
// trip class

class CreateTrip {
    
// trip created

static  trip(req, res) {
const newTrip = {
trip_id:trips.length + 1,
seating_capacity:req.body.seating_capacity,
bus_license_number:req.body.bus_license_number,
origin: req.body.origin,
destination: req.body.destination,
trip_date: req.body.trip_date,
fare: req.body.farer,
status:"active"

};
for (let i =0; i<trips.length;i++){
  
  if(trips[i].trip_date===req.body.trip_date && trips[i].origin===req.body.origin
     && trips[i].destination===req.body.destination && trips[i].bus_license_number===req.body.bus_license_number)
     
    return res.status(200).send({ status: 'success', data: "this trip was created" });
    
         
      }

trips.push(newTrip);

// trip response
return res.status(201).send({ status: 'success', data: { 
    trip_id:req.body.trip_id,
    seating_capacity:req.body.seating_capacity,
    bus_license_number:req.body.bus_license_number,
    origin: req.body.origin,
    destination: req.body.destination,
    trip_date: req.body.trip_date,
    fare: req.body.farer,
    status:"active"
 } });

}

// get all trip

static  getAllTrip(req, res) {
    if(trips.length > 0){
     return  res.status(200).json({ status: 'success', data: trips});
    }
    return res.status(200).json({ status: 'success', data: { 'message':'trips not found!'} });
}

// specific trip

static  getSpecificTrip(req, res) {
    const findTrip =   trips.find(t => t.trip_id === parseInt(req.params.trip_id));
    if(findTrip)
         return res.status(200).send({ status: 'success', data: findTrip});
      return res.status(200).send({ status: 'success', data: { 
      'message':'trip not found!'
     } });

}

//filter trips using origin or destination,both
static filterTrips (req, res) {
  const { destination, origin } = req.query;
  if (trips.length === 0)  return res.status(200).send({ status: 'success', data: { 
      'message':'trip not found!'
     } }); 
  try {
    const foundDestination = findQueryByDestination(destination);
    const foundOrigin = findQueryByOrigin(origin);
    if (foundDestination.length >= 1) return res.status(200).send({ status: 'success', data: foundDestination});                                    
    if (foundOrigin.length >= 1)  return res.status(200).send({ status: 'success', data: foundOrigin}); 
                                   return res.status(200).send({ status: 'success', data: "your filter direction not found"});
                                  
    // next();
  // eslint-disable-next-line no-empty
  } catch (error) {
    console.log(error);
  }
  return true;
}




// cancel trip

static  cancelTrip(req, res) {
    const findTrip =   trips.find(t => t.trip_id === parseInt(req.params.trip_id));
    if(findTrip)

    findTrip.status = 'unactive';
       
  
         res.status(200).send({ status: 'success', data: 'Trip cancelled successfully'});

        return res.status(200).send({ status: 'success', data: { 
        'message':'trip not found!'
     } });

}

static  activeTrip(req, res) {
  const findTrip =   trips.find(t => t.trip_id === parseInt(req.params.trip_id));
  if(findTrip)

  findTrip.status = 'active';
     

       res.status(200).send({ status: 'success', data: 'Trip activety successfully'});

      return res.status(200).send({ status: 'success', data: { 
      'message':'trip not found!'
   } });

}


}
export default CreateTrip;