class HomeController < ApplicationController
	
	def create
		print "********************************HERE*************************"
		@location = Locations.new
		@location.latitude = params[:latitude]
		@location.longitude = params[:longitude]
		@location.email = current_user.email
		print "location", @location
		if @location.save!
			flash[:notice] = "Success"
			redirect_to locations_path
		end
	end
	
	def index
		@locations = Locations.all
		
		print "********************************************************"
		print @locations
	end
	
	def show
		@locations = Locations.all
		
		print "********************************************************"
		print @locations
	end
end
